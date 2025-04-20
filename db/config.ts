import { column, defineDb, defineTable, NOW } from 'astro:db'

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }),
    archetype: column.text({ optional: true }),
    date: column.date({ default: NOW }),
  },
})

export default defineDb({
  tables: { User },
})
