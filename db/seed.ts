import { db, Email } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Email).values([
    {
      id: 1,
      email: 'josh@wavelandweb.com',
      createdAt: new Date(),
    },
  ])
}
