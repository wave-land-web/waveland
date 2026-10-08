export const prerender = false

import type { APIRoute } from 'astro'
import { render } from '@react-email/components'
import { createElement } from 'react'
import { Resend } from 'resend'
import ContactAutoReply from '../../emails/ContactAutoReply'

/**
 * The contact form posts here. Akismet checks each message for spam first.
 * A real message goes two places at once:
 * - HubSpot, which notifies Josh and keeps the contact
 * - Netlify Forms, as a backup copy, through the hidden form in public/__forms.html
 * Once either has it, Resend sends the sender a reply with the Calendly link (src/emails/ContactAutoReply.tsx).
 * The sender lands on /success/ if either one took it, or back on the form with an error if neither did.
 * Spam only goes to Netlify Forms, marked as spam, so a wrong call can still be found there. It gets no HubSpot
 * contact and no reply, so the form can't be used to send mail from Josh's address to strangers.
 *
 * Env (Netlify, functions scope): HUBSPOT_PORTAL_ID, HUBSPOT_FORM_ID, RESEND_API_KEY, AKISMET_API_KEY
 */

// "I'm Reaching Out As" → the Lead Type contact property, for routing agencies and businesses separately
const leadTypes: Record<string, string> = {
  'An agency': 'agency',
  'A business or organization': 'business',
  'Something else': 'other',
}

// Contact form field → HubSpot contact property
const fieldMap: Record<string, string> = {
  'first-name': 'firstname',
  'last-name': 'lastname',
  email: 'email',
  website: 'website',
  budget: 'budget',
  timeline: 'timeline',
  message: 'message',
}

const required = ['first-name', 'email', 'role', 'message']

// One plain address: no spaces, commas or angle brackets that could add a second recipient
const emailPattern = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/

// The reply greets people by name only when it looks like a name, so no one can put their own words (a link, a
// fake invoice) at the top of an email from Josh's address
const namePattern = /^[\p{L}\p{M}' -]{1,40}$/u

// Give up on a slow service before the function itself times out, so the sender still gets a page.
// The spam check runs first and the rest after it, so together they stay under Netlify's 10 seconds.
const timeout = (ms = 6000) => AbortSignal.timeout(ms)

// Akismet's verdict. Any trouble reaching it counts as not spam, so a real lead is never lost to an outage.
async function isSpam(data: Record<string, string>, request: Request, ipAddress: string) {
  if (!process.env.AKISMET_API_KEY) {
    console.warn('Akismet isn’t configured: set AKISMET_API_KEY. Messages go through unchecked.')
    return false
  }
  try {
    const response = await fetch('https://rest.akismet.com/1.1/comment-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        api_key: process.env.AKISMET_API_KEY,
        blog: import.meta.env.SITE,
        user_ip: ipAddress,
        user_agent: request.headers.get('user-agent') ?? '',
        referrer: request.headers.get('referer') ?? '',
        comment_type: 'contact-form',
        comment_author: [data['first-name'], data['last-name']].filter(Boolean).join(' '),
        comment_author_email: data.email,
        comment_author_url: data.website ?? '',
        comment_content: data.message,
        blog_lang: 'en',
      }),
      signal: timeout(3000),
    })
    const verdict = await response.text()
    if (verdict === 'true') return true
    if (verdict !== 'false') console.error(`Akismet couldn’t check the message (${response.headers.get('x-akismet-debug-help') ?? verdict})`)
    return false
  } catch (error) {
    console.error(`Akismet couldn’t check the message (${String(error)})`)
    return false
  }
}

async function sendToHubSpot(data: Record<string, string>, ipAddress: string) {
  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formId = process.env.HUBSPOT_FORM_ID
  if (!portalId || !formId) throw new Error('HubSpot isn’t configured: set HUBSPOT_PORTAL_ID and HUBSPOT_FORM_ID')

  const fields = Object.entries(fieldMap)
    .filter(([field]) => data[field])
    .map(([field, name]) => ({ objectTypeId: '0-1', name, value: data[field] }))
  const leadType = leadTypes[data.role]
  if (leadType) fields.push({ objectTypeId: '0-1', name: 'lead_type', value: leadType })
  // An option renamed on the form but not here; the lead still goes through, only without its Lead Type
  else console.warn('Contact form: an "I’m Reaching Out As" option has no Lead Type mapping')

  const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields,
      // Always the live address: HubSpot quarantines submissions from domains it doesn't know, like deploy previews
      context: { pageUri: new URL('/contact/', import.meta.env.SITE).href, pageName: 'Contact | Wave Land', ipAddress },
    }),
    signal: timeout(),
  })
  if (!response.ok) {
    // Only the error types: HubSpot's messages can repeat what the sender typed, which doesn't belong in logs
    const body = await response.json().catch(() => ({}))
    const types = (body.errors ?? []).map((error: { errorType?: string }) => error.errorType).join(', ')
    throw new Error(`HubSpot refused the submission (${response.status}${types ? `: ${types}` : ''})`)
  }
}

async function saveToNetlify(data: Record<string, string>, request: Request) {
  const response = await fetch(new URL('/__forms.html', request.url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': 'contactForm', ...data }).toString(),
    signal: timeout(),
  })
  if (!response.ok) throw new Error(`Netlify Forms refused the backup copy (${response.status})`)
}

// Sent from Josh's own address, so a reply lands in his inbox
async function sendAutoReply(data: Record<string, string>) {
  if (!process.env.RESEND_API_KEY) throw new Error('Resend isn’t configured: set RESEND_API_KEY')
  const firstName = namePattern.test(data['first-name']) ? data['first-name'] : 'there'
  const email = createElement(ContactAutoReply, { firstName })
  const [html, text] = await Promise.all([render(email), render(email, { plainText: true })])
  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: 'Josh Nussbaum <josh@wavelandweb.com>',
    to: data.email,
    subject: 'Got your message',
    html,
    text,
  })
  if (error) throw new Error(`Resend refused the auto-reply (${error.name})`)
}

export const POST: APIRoute = async ({ request, redirect, clientAddress, locals }) => {
  let data: Record<string, string>
  try {
    const form = await request.formData()
    data = Object.fromEntries([...form].map(([name, value]) => [name, String(value).trim()]))
  } catch {
    // Not a form post (a scanner or a broken request): back to the form, nothing sent
    return redirect('/contact/', 303)
  }

  // Honeypot: people never see this field, so anything in it is a bot. It gets the success page and nothing is sent.
  if (data['bot-field']) return redirect('/success/', 303)
  delete data['bot-field']

  // The browser checks these too; this catches anything that skips the form
  if (required.some((name) => !data[name])) return redirect('/contact/?error=missing', 303)
  if (data.email.length > 254 || !emailPattern.test(data.email)) return redirect('/contact/?error=email', 303)

  if (await isSpam(data, request, clientAddress)) {
    await saveToNetlify({ ...data, flagged: 'Akismet marked this as spam' }, request).catch((error) => console.error(String(error)))
    return redirect('/success/', 303)
  }

  const [hubspot, netlify] = await Promise.allSettled([sendToHubSpot(data, clientAddress), saveToNetlify(data, request)])
  for (const result of [hubspot, netlify]) if (result.status === 'rejected') console.error(String(result.reason))

  // Either copy is enough to follow up on, so the sender only sees an error when both failed
  if (hubspot.status === 'rejected' && netlify.status === 'rejected') return redirect('/contact/?error=send', 303)

  // The message is safe by now, so the reply goes out after the success page does and a failure is only logged.
  // waitUntil keeps the function running until it's sent; the dev server has no such limit, so it just runs.
  const reply = sendAutoReply(data).catch((error) => console.error(String(error)))
  locals.netlify?.context.waitUntil(reply)
  return redirect('/success/', 303)
}
