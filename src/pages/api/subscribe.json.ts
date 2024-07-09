export const prerender = false

import type { APIRoute } from 'astro'
import { db, Email, like } from 'astro:db'
import { createNewUser, resubscribeUser } from '../../lib/newsletter'
import { resend } from '../../lib/resend'

/**
 * Handles the POST request for subscribing an email address.
 *
 * @param request The request object containing the form data.
 * @returns A response indicating the success or failure of the subscription.
 */
export const POST: APIRoute = async ({ request }) => {
  // Email is the name of the input field in the form
  const data = await request.formData()
  const email = data.get('email') as string

  // If for whatever reason HTML form validation fails >> return an error
  if (!email) {
    return new Response(
      JSON.stringify({
        error: `Email is required`,
      }),
      { status: 400 }
    )
  }

  // -------------------------
  // ------ DB + Resend ------
  // -------------------------

  // Check if the user already exists in the database and is subscribed
  const existingUser = await db.select().from(Email).where(like(Email.email, email))
  const userExistsAndIsSubscribed = existingUser.length && !existingUser[0].unsubscribed
  const userExistsAndIsUnsubscribed = existingUser.length && existingUser[0].unsubscribed

  // If the user doesn't exist >> create a new user
  if (!existingUser.length) {
    await createNewUser(email)
  }

  // If user is not subscribed >> resubscribe them
  if (userExistsAndIsUnsubscribed) {
    await resubscribeUser(email)
  }

  // If user is already subscribed >> return an error
  if (userExistsAndIsSubscribed) {
    return new Response(
      JSON.stringify({
        error: `Email address ${email} is already subscribed`,
      }),
      { status: 400 }
    )
  }

  // ------------------------
  // ------ Send Email ------
  // ------------------------

  // Send an email to the user confirming their subscription
  // This is a workaround to avoid rate limiting issues with Resend (2 requests per second)
  setTimeout(async () => {
    const { data: welcomeData, error: welcomeError } = await resend.emails.send({
      from: 'Wave Land <josh@wavelandweb.com>',
      to: [email],
      bcc: ['josh@wavelandweb.com'],
      subject: `Welcome to Wave Land, ${email} 🌊`,
      html: /* HTML */ `
        <body
          style='font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; color: #0E1726; margin-bottom: 36px;'
        >
          <img
            alt="Wave Land Logo"
            height="auto"
            src="https://wavelandweb.com/images/title-logo.png"
            style="display:block;outline:none;border:none;text-decoration:none;margin-top:24px;margin-bottom:24px;margin-right:auto;"
            width="170"
          />
          <p>
            Hey! I'm Josh, owner of
            <a href="https://wavelandweb.com/" target="_blank">Wave Land</a>,
          </p>
          <p>Thanks so much being here.</p>
          <p>
            Building websites allows me to work with so many amazing people, solving interesting and
            creative problems.
          </p>
          <p>
            I've learned a lot along the way, and I want to share these valuable nuggets whenever
            possible.
          </p>
          <p>
            In the <a href="https://wavelandweb.com/blog" target="_blank">Wave Land blog</a>, and
            here in our newsletter, I share my thoughts about technology and building on the web
            with you.
          </p>
          <p>
            I'll also share updates on Wave Land's latest projects, services, and special offers,
            along with tips and tricks to help you in your creative journey.
          </p>
          <p>
            Reach out anytime with questions, comments, or just to say hi -
            <a href="mailto:hello@wavelandweb.com">hello@wavelandweb.com</a>.
          </p>
          <p>Thanks again for joining, <br />Josh</p>
          <p>
            <a href="https://www.linkedin.com/company/wave-land-web/" target="_blank">LinkedIn</a>
            |
            <a href="https://www.instagram.com/wavelandweb/" target="_blank">Instagram</a>
          </p>
          <p style="color:#626060;">
            To unsubscribe, simply reply to this email with "Unsubscribe" in the subject line or
            click the link below.
          </p>
          <p>
            <a href="http://localhost:4321/api/unsubscribe/${email}" target="_blank">Unsubscribe</a>
          </p>
        </body>
      `,
    })

    // Log the response from Resend
    console.log(welcomeData, welcomeError)

    // If there was an error sending the email >> return an error
    if (welcomeError) {
      return new Response(
        JSON.stringify({
          error: `There was an error sending the email: ${welcomeError}`,
        }),
        { status: 500 }
      )
    }
  }, 2000)

  // If everything worked >> return a success message
  return new Response(
    JSON.stringify({ message: `Email address ${email} was successfully subscribed 🌊` }),
    {
      status: 200,
    }
  )
}
