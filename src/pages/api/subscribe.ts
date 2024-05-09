import type { APIRoute } from 'astro'
import { db, Email } from 'astro:db'

export const POST: APIRoute = async ({ request }) => {
  // Email is the name of the input field in the form
  const data = await request.formData()
  const email = data.get('email')

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
    // insert form data into the Email table
    await db.insert(Email).values({ email })
  }

  // If everything worked, return a success message
  return new Response(
    JSON.stringify({ message: `Email address ${email} was successfully subscribed` }),
    {
      status: 200,
    }
  )
}
