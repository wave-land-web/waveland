import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async (context) => {
  const blog = await getCollection('blog')

  return rss({
    title: "Wave Land Web's Blog",
    description: 'Musings on web development and the broader creative landscape',
    site: context.site || '',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.published),
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  })
}
