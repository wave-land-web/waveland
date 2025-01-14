import type { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent.ts'
import caseStudy from './case-study'
import post from './post'
import tag from './tag'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, caseStudy, post, tag],
}
