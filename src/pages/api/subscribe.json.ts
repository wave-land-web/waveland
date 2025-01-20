export const prerender = false

import type { APIRoute } from 'astro'
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
  // ------ Create User ------
  // -------------------------

  // Subscribe the user to the Resend audience
  const { data: subscribeData, error: subscribeError } = await resend.contacts.create({
    email,
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })

  // Log the response from Resend
  console.log(subscribeData, subscribeError)

  // ------------------------
  // ------ Send Email ------
  // ------------------------

  // Send an email to the user confirming their subscription
  const { data: welcomeEmailData, error: welcomeEmailError } = await resend.emails.send({
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
          In the <a href="https://wavelandweb.com/blog" target="_blank">Wave Land blog</a>, and here
          in our newsletter, I share my thoughts about technology and building on the web with you.
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
          <a href="https://www.linkedin.com/company/wave-land/" target="_blank">LinkedIn</a>
          |
          <a href="https://www.instagram.com/wavelandweb/" target="_blank">Instagram</a>
        </p>
        <p style="color:#626060;">
          To unsubscribe, simply reply to this email with "Unsubscribe" in the subject line or click
          the link below.
        </p>
        <p>
          <a href="https://wavelandweb.com/api/unsubscribe/${email}" target="_blank">Unsubscribe</a>
        </p>
      </body>
    `,
  })

  // Log the response from Resend
  console.log(welcomeEmailData, welcomeEmailError)

  // If there was an error subscribing the email address >> return an error
  if (subscribeError) {
    return new Response(
      JSON.stringify({
        error: `There was an error subscribing the email address: ${subscribeError?.message}`,
      }),
      { status: 500 }
    )
  }

  // If there was an error sending the email >> return an error
  if (welcomeEmailError) {
    return new Response(
      JSON.stringify({
        error: `There was an error sending the email: ${welcomeEmailError}`,
      }),
      { status: 500 }
    )
  }

  // If everything worked >> return a success message
  return new Response(
    JSON.stringify({ message: `Email address ${email} was successfully subscribed 🌊` }),
    {
      status: 200,
    }
  )
}
