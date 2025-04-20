import { db, User } from 'astro:db'

// https://astro.build/db/seed
export default async function () {
  await db.insert(User).values([
    { id: 1, email: 'Kasim@mail.com', archetype: 'Creator', date: new Date() },
    { id: 2, email: 'Mina@mail.com', archetype: 'Connector', date: new Date() },
    { id: 3, email: 'John@mail.com', archetype: 'Explorer', date: new Date() },
  ])
}
