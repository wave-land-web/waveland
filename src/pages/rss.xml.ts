import rss from '@astrojs/rss'
import type { SanityDocument } from '@sanity/client'
import type { APIRoute } from 'astro'
import { sanityClient } from 'sanity:client'

export const GET: APIRoute = async (context) => {
  // Fetch all posts
  const posts = (await sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      description,
    }`
  )) as SanityDocument[]

  return rss({
    title: 'Wave Land Web | Blog',
    description:
      "Musings on technology and building for the web. Subscribe to know what we've been up to, along with tips and tricks to help you in your creative journey.",
    site: context.site || '',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.description,
      link: `/blog/${post.slug.current}/`,
    })),
  })
}
