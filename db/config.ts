import { column, defineDb, defineTable, sql } from 'astro:db'

const Email = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text(),
    createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
    unsubscribed: column.boolean({ default: false }),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: { Email },
})
