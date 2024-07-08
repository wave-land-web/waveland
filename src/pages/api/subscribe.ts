export const prerender = false

import type { APIRoute } from 'astro'
import { db, Email, like } from 'astro:db'
import { resend } from '../../lib/resend'

export const POST: APIRoute = async ({ request }) => {
  // Email is the name of the input field in the form
  const data = await request.formData()
  const email = data.get('email') as string

  // ------------------------------------
  // ------ Handle Form Validation ------
  // ------------------------------------

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

  // -------------------------
  // ------ Send Emails ------
  // -------------------------

  // If there are no validation errors, send a welcome email to the subscriber
  const { data: welcomeData, error: welcomeError } = await resend.emails.send({
    from: 'Wave Land <josh@wavelandweb.com>',
    to: [email],
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
          Hey! I'm Josh, owner of <a href="https://wavelandweb.com/" target="_blank">Wave Land</a>,
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
          <a href="https://www.linkedin.com/company/wave-land-web/" target="_blank">LinkedIn</a>
          |
          <a href="https://www.instagram.com/wavelandweb/" target="_blank">Instagram</a>
        </p>
        <p style="color:#626060;">
          To unsubscribe, simply reply to this email with "Unsubscribe" in the subject line.
        </p>
      </body>
    `,
  })

  // Send email to Wave Land to notify admin of new subscribers
  const { data: notificationData, error: notificationError } = await resend.emails.send({
    from: 'Wave Land Newsletter <josh@wavelandweb.com>',
    to: ['josh@wavelandweb.com'],
    subject: `New Subscriber: ${email}`,
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
        <p>New subscriber: ${email} 🤘</p>
        <p>
          Click
          <a href="https://studio.astro.build/joshnussbaum89/waveland/data/Email" target="_blank"
            >here</a
          >
          to see all of your newsletter subscribers.
        </p>
        <p>
          Click <a href="https://resend.com/emails" target="_blank">here</a> to manage your audience
          with Resend.
        </p>
      </body>
    `,
  })

  // Log the response from Resend
  console.log({
    'Welcome Email': {
      data: welcomeData,
      error: welcomeError,
    },
    'Notification Email': {
      data: notificationData,
      error: notificationError,
    },
  })

  // If there was an error sending either email, return an error
  if (welcomeError || notificationError) {
    return new Response(
      JSON.stringify({
        error: `There was an error sending the email: ${welcomeError || notificationError}`,
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
