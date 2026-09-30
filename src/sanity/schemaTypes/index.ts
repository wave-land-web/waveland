import type { SchemaTypeDefinition } from 'sanity'
import blockContent from './blockContent.ts'
import caseStudy from './case-study'
import caseStudyOrder from './case-study-order'
import testimonial from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, caseStudy, caseStudyOrder, testimonial],
}
