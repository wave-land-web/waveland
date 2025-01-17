import rss from '@astrojs/rss'
import type { SanityDocument } from '@sanity/client'
import type { APIRoute } from 'astro'
import { sanityClient } from 'sanity:client'

export const GET: APIRoute = async (context) => {
  // Fetch all posts + case studies
  const posts = (await sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      description,
    }`
  )) as SanityDocument[]

  const caseStudies = (await sanityClient.fetch(
    `*[_type == "case-study"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      description,
    }`
  )) as SanityDocument[]

  // Format posts + case studies into RSS items
  const postItems = posts.map((post) => ({
    title: post.title,
    pubDate: new Date(post.publishedAt),
    description: post.description,
    link: `/blog/${post.slug.current}/`,
  }))

  const caseStudyItems = caseStudies.map((caseStudy) => ({
    title: caseStudy.title,
    pubDate: new Date(caseStudy.publishedAt),
    description: caseStudy.description,
    link: `/case-studies/${caseStudy.slug.current}/`,
  }))

  // Return RSS feed
  return rss({
    title: 'Wave Land Web | Blog',
    description:
      "Musings on technology and building for the web. Subscribe to know what we've been up to, along with tips and tricks to help you in your creative journey.",
    site: context.site || '',
    items: [...postItems, ...caseStudyItems],
  })
}
