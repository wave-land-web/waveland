import { db, Email, eq, like } from 'astro:db'

/**
 * Creates a new user with the specified email.
 *
 * @param email - The email of the user to create.
 * @returns A Promise that resolves when the user has been created.
 */
export async function createNewUser(email: string) {
  // Insert the email into the database
  await db.insert(Email).values({ email })
}

/**
 * Resubscribes a user by updating their email status in the database and Resend.
 *
 * @param email - The email of the user to resubscribe.
 * @returns A Promise that resolves when the user has been resubscribed.
 */
export async function resubscribeUser(email: string) {
  // Resubscribe the user in the database
  await db.update(Email).set({ unsubscribed: false }).where(like(Email.email, email))
}

/**
 * Unsubscribes a user by updating their email status in the database and Resend audience.
 *
 * @param email - The email address of the user to unsubscribe.
 * @returns A Promise that resolves when the user has been unsubscribed.
 */
export async function unsubscribeUser(email: string) {
  // Unsubscribe the user in the database
  await db.update(Email).set({ unsubscribed: true }).where(eq(Email.email, email))
}
