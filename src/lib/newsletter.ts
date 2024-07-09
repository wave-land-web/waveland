import { db, Email, eq, like } from 'astro:db'
import { resend } from './resend'

/**
 * Creates a new user with the specified email.
 *
 * @param email - The email of the user to create.
 * @returns A Promise that resolves when the user has been created.
 */
export async function createNewUser(email: string) {
  // Insert the email into the database
  await db.insert(Email).values({ email })

  // Insert the email into the Resend audience
  await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })
}

/**
 * Resubscribes a user by updating their email status in the database and Resend.
 *
 * @param email - The email of the user to resubscribe.
 * @returns A Promise that resolves when the user has been resubscribed.
 */
export async function resubscribeUser(email: string) {
  // Grab contact + user info from the Resend audience
  const contactData = (
    await resend.contacts.list({ audienceId: import.meta.env.RESEND_AUDIENCE_ID })
  ).data?.data
  const contactToResubscribe = contactData?.find((contact) => contact.email === email)

  // Resubscribe the user in the database
  await db.update(Email).set({ unsubscribed: false }).where(like(Email.email, email))

  // Resubscribe the user in Resend
  await resend.contacts.update({
    id: contactToResubscribe?.id!,
    unsubscribed: false,
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })
}

/**
 * Unsubscribes a user by updating their email status in the database and Resend audience.
 *
 * @param email - The email address of the user to unsubscribe.
 * @returns A Promise that resolves when the user has been unsubscribed.
 */
export async function unsubscribeUser(email: string) {
  // Grab contact + user info from the Resend audience
  const contacts = (await resend.contacts.list({ audienceId: import.meta.env.RESEND_AUDIENCE_ID }))
    .data?.data
  const contactToUnsubscribe = contacts?.find((contact) => contact.email === email)

  // Unsubscribe the user in the database
  await db.update(Email).set({ unsubscribed: true }).where(eq(Email.email, email))

  // Unsubscribe the user in Resend
  await resend.contacts.update({
    id: contactToUnsubscribe?.id!,
    unsubscribed: true,
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })
}
