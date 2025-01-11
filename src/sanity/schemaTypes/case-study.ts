import { ProjectsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'case-study',
  title: 'Case Study',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (h1)',
      type: 'string',
      validation: (Rule) => Rule.required().error('Please add a title'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required().error('Please add a description'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The "slug" will be the URL path for your case study - ex/ wavelandweb.com/case-studies/supervoid',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error('Please create your own, or click "generate" to add a slug'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      validation: (Rule) => Rule.required().error('Please add an image'),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text *',
          type: 'string',
          description: `Please add a brief description of your image to help people with visual impairments understand the meaning of the image`,
          validation: (Rule) => Rule.required().error('Please add alternative text'),
        },
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          { title: 'Web Design & Development', value: 'Web Design & Development' },
          { title: 'Digital Strategy', value: 'Digital Strategy' },
          { title: 'UX/UI', value: 'UX/UI' },
        ],
        layout: 'list',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
      validation: (Rule) => Rule.required().error('Please add a date'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Add content here',
      validation: (Rule) =>
        Rule.required().error(
          'Body text is required to create a case study - please add some text'
        ),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const { title, media, date } = selection
      return {
        title: title ? title : 'Untitled',
        media: media ? media : undefined,
        subtitle: date ? `${date.split('-')[1]}-${date.split('-')[2]}-${date.split('-')[0]}` : '', // YYYY-MM-DD --> MM-DD-YYYY
      }
    },
  },
})
