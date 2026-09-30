import { defineCliConfig } from 'sanity/cli'

// Used by the Sanity CLI (schema extract, typegen). Same project as astro.config.mjs.
export default defineCliConfig({
  api: { projectId: 'uuas57um', dataset: 'production' },
  typegen: {
    path: './src/sanity/lib/queries.ts',
    schema: './schema.json',
    generates: './src/sanity/sanity.types.ts',
    // sanityClient.fetch(QUERY) returns the query's result type, with no generic needed
    overloadClientMethods: true,
  },
})
