import { ProjectsIcon } from '@sanity/icons/Projects'
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
      name: 'shortName',
      title: 'Short Name',
      type: 'string',
      description: 'Optional. Replaces the title in the table of contents, for example "BGD" for Big Giant Donut',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Shown on the case study card, and in search results unless Search and Sharing has its own',
      validation: (Rule) => [
        Rule.required().error('Please add a description'),
        Rule.max(160).warning('Search results cut descriptions off at about 160 characters'),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Search and Sharing',
      type: 'object',
      description: 'Optional. Leave blank to use the title and description above.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'title',
          title: 'Search Title',
          type: 'string',
          description: 'Replaces "<Title> Case Study | Wave Land" in search results and link previews',
          validation: (Rule) => Rule.max(60).warning('Search results cut titles off at about 60 characters'),
        }),
        defineField({
          name: 'description',
          title: 'Search Description',
          type: 'text',
          rows: 3,
          description: 'Replaces the description in search results and link previews',
          validation: (Rule) => Rule.max(160).warning('Search results cut descriptions off at about 160 characters'),
        }),
      ],
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Site URL',
      type: 'url',
      description: 'The URL to the live website (if applicable)',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The "slug" will be the URL path for your case study - ex/ wavelandweb.com/case-studies/supervoid',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Please create your own, or click "generate" to add a slug'),
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
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'Shown on the case study card, and used to filter the Case Studies page',
      options: {
        list: ['Astro + Sanity', 'Astro', 'Webflow', 'Shopify', 'Wix', 'WordPress', 'HubSpot', 'Squarespace'],
      },
      validation: (Rule) => Rule.required().error('Please pick a platform'),
    }),
    defineField({
      name: 'workedWith',
      title: 'Worked With',
      type: 'string',
      description: 'Who hired me. Never name the agency here.',
      options: {
        list: [
          { title: 'For an agency (their own site)', value: 'for-agency' },
          { title: 'With an agency (their client)', value: 'with-agency' },
          { title: 'Directly with the client', value: 'direct' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Please pick who you worked with'),
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
          { title: 'Development', value: 'Development' },
          { title: 'Strategy', value: 'Strategy' },
          { title: 'Partnership', value: 'Partnership' },
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
      validation: (Rule) => Rule.required().error('Body text is required to create a case study - please add some text'),
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
