import type { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent.ts'
import caseStudy from './case-study'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, caseStudy],
}
