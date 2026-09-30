import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Wave Land',
  // From .env when Astro runs the Studio; the Sanity CLI (typegen) doesn't load it, so fall back to the same public values
  projectId: import.meta.env?.PUBLIC_SANITY_PROJECT_ID ?? 'uuas57um',
  dataset: import.meta.env?.PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool({ structure }), visionTool(), codeInput()],
  schema: {
    ...schema,
    // Case Study Order is a single document, opened from the menu, so it's not offered under "Create"
    templates: (templates) => templates.filter((t) => t.schemaType !== 'case-study-order'),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === 'case-study-order' ? actions.filter((a) => !['duplicate', 'delete', 'unpublish'].includes(a.action ?? '')) : actions,
  },
})
