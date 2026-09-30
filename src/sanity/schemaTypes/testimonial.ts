import { CommentIcon } from '@sanity/icons/Comment'
import { defineField, defineType } from 'sanity'

// A client quote for the homepage carousel
export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 5,
      description: 'Exactly as the client wrote it, without quote marks',
      validation: (Rule) => Rule.required().error('Please add the quote'),
    }),
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'string',
      description: 'First name and their site, e.g. "Drew, Supervoid.tv"',
      validation: (Rule) => Rule.required().error('Please add who said it'),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Their case study (/case-studies/supervoid/) or their live site (https://…). Optional.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first in the carousel',
      initialValue: 10,
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  orderings: [{ title: 'Carousel order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'citation', subtitle: 'quote' },
  },
})
