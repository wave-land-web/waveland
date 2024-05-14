import type { APIRoute } from 'astro'
// import { db, Email, like } from 'astro:db'

export const POST: APIRoute = async ({ request }) => {
  // For now, just return a success message
  console.log('request', request)
  return new Response(JSON.stringify({ message: `Email address was successfully subscribed 🌊` }), {
    status: 200,
  })

  // // Email is the name of the input field in the form
  // const data = await request.formData()
  // const email = data.get('email')

  // // If for whatever reason HTML form validation fails, return an error
  // if (!email) {
  //   return new Response(
  //     JSON.stringify({
  //       error: `Email is required`,
  //     }),
  //     { status: 400 }
  //   )
  // }

  // if (typeof email === 'string') {
  //   // check if the email already exists in the database
  //   const existingEmail = await db.select().from(Email).where(like(Email.email, email))

  //   // If the email already exists, return an error
  //   if (existingEmail.length) {
  //     return new Response(
  //       JSON.stringify({
  //         error: `Email address ${email} is already subscribed`,
  //       }),
  //       { status: 400 }
  //     )
  //   }

  //   // insert form data into the Email table if it doesn't already exist
  //   await db.insert(Email).values({ email })
  // }

  // // If everything worked, return a success message
  // return new Response(
  //   JSON.stringify({ message: `Email address ${email} was successfully subscribed 🌊` }),
  //   {
  //     status: 200,
  //   }
  // )
}
