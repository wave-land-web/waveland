export const prerender = false

import type { APIRoute } from 'astro'
import { db, Email, like } from 'astro:db'
import { resend } from '../../lib/resend'

export const POST: APIRoute = async ({ request }) => {
  // Email is the name of the input field in the form
  const data = await request.formData()
  const email = data.get('email') as string

  // If for whatever reason HTML form validation fails, return an error
  if (!email) {
    return new Response(
      JSON.stringify({
        error: `Email is required`,
      }),
      { status: 400 }
    )
  }

  if (typeof email === 'string') {
    // check if the email already exists in the database
    const existingEmail = await db.select().from(Email).where(like(Email.email, email))

    // If the email already exists, return an error
    if (existingEmail.length) {
      return new Response(
        JSON.stringify({
          error: `Email address ${email} is already subscribed`,
        }),
        { status: 400 }
      )
    }

    // Insert form data into the Email table if it doesn't already exist
    await db.insert(Email).values({ email })
  }

  // Resend API
  // Send a welcome email to the subscriber
  const { data: resendData, error } = await resend.emails.send({
    from: 'Wave Land <josh@wavelandweb.com>',
    to: [email],
    subject: 'Welcome to the Wave Land Newsletter 🌊',
    html: /* HTML */ `
      <body
        style='font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; color: #0E1726;'
      >
        <img
          alt="Wave Land Logo"
          height="auto"
          src="https://wavelandweb.com/images/title-logo.png"
          style="display:block;outline:none;border:none;text-decoration:none;margin-top:24px;margin-bottom:24px;margin-right:auto;"
          width="170"
        />
        <p>
          Hey! I'm Josh, owner of <a href="https://wavelandweb.com/" target="_blank">Wave Land</a>,
        </p>
        <p>Thanks so much being here.</p>
        <p>
          Wave Land is special to me because I get to work with so many amazing people and solve
          interesting and creative problems when building their websites.
        </p>
        <p>
          I've learned a lot along the way, and I want to share as much value as possible with you.
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
          I'm here to help, so if you have questions or need help, drop us a line at
          <a href="mailto:hello@wavelandweb.com">hello@wavelandweb.com</a>.
        </p>
        <p>Stay tuned for more, and thanks again for joining!</p>
      </body>
    `,
  })

  // TODO: do we need to log this?
  console.log({ resendData, error })

  // If there was an error sending the email, return an error
  if (error) {
    return new Response(
      JSON.stringify({
        error: `There was an error sending the email: ${error}`,
      }),
      { status: 500 }
    )
  }

  // If everything worked, return a success message
  return new Response(
    JSON.stringify({ message: `Email address ${email} was successfully subscribed 🌊` }),
    {
      status: 200,
    }
  )
}
