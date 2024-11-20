import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((tag) => {
          // Regex to check for non-alphanumeric characters
          const regex = /[^a-zA-Z0-9 ]/g

          // Check if tag exists and only contains alphanumeric characters
          if (tag === undefined) {
            return 'Please add a title'
          } else if (regex.test(tag)) {
            return 'Please use only alphanumeric characters'
          } else {
            return true
          }
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The "slug" will be the URL path for your post - ex/ www.wavelandweb.com/blog/tags/web-development',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error('Please create your own, or click "generate" to add a slug'),
    }),
  ],
})
