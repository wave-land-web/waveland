export const prerender = false

import type { APIRoute } from 'astro'
import { resend } from '../../../lib/resend'

/**
 * GET request handler for unsubscribing an email.
 *
 * @param params The request parameters.
 * @param redirect The redirect function.
 * @returns The response object.
 */
export const GET: APIRoute = async ({ params, redirect }) => {
  // Extract the email from the URL
  const { email } = params

  // If there is no email in the URL >> return an error
  if (!email) {
    return new Response(null, {
      status: 404,
      statusText: 'Email Not found',
    })
  }

  // Handle unsubscription from the Resend audience
  const { data: unsubscribeData, error: unsubscribeError } = await resend.contacts.remove({
    email,
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })

  // Log the response from Resend
  console.log(unsubscribeData, unsubscribeError)

  // Send an email to the user confirming their unsubscription
  const { data: unsubscribeEmailData, error: unsubscribeEmailError } = await resend.emails.send({
    from: 'Wave Land <hello@wavelandweb.com>',
    to: email,
    bcc: ['josh@wavelandweb.com'],
    subject: 'You have been unsubscribed',
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
          ${email} has been unsubscribed from our email list. You will no longer receive any emails
          from us.
        </p>
        <p>Go back to our website → <a href="https://wavelandweb.com">Wave Land</a></p>
      </body>
    `,
  })

  // Log the response from Resend
  console.log(unsubscribeEmailData, unsubscribeEmailError)

  // If there was an error unsubscribing the user  >> return an error
  if (unsubscribeError?.message) {
    return new Response(
      JSON.stringify({
        error: `There was an error unsubscribing ${email}. Please try again later. Error: ${unsubscribeError.message}`,
      }),
      { status: 500 }
    )
  }

  // If there was an error sending the unsubscription email >> return an error
  if (unsubscribeEmailError?.message) {
    return new Response(
      JSON.stringify({
        error: `There was an error sending the unsubscription email to ${email}. Please try again later. Error: ${unsubscribeEmailError.message}`,
      }),
      { status: 500 }
    )
  }

  // If unsubscription was successful >> redirect to the `/unsubscribed` page
  return redirect('/unsubscribed', 303)
}
