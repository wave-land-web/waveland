import { SortIcon } from '@sanity/icons/Sort'
import { defineArrayMember, defineField, defineType } from 'sanity'

// One document that sets the order of the Case Studies page. Anything left out still shows, after these, newest first.
export default defineType({
  name: 'case-study-order',
  title: 'Case Study Order',
  type: 'document',
  icon: SortIcon,
  fields: [
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      description:
        'Drag to set the order on the Case Studies page. The first one is shown first. Case studies you leave out still appear, after these, newest first.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'case-study' }] })],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Case Study Order' }),
  },
})
