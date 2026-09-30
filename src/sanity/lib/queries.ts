import { defineQuery } from 'groq'

// Every GROQ query the site runs. `npm run typegen` reads these and writes their result types to sanity.types.ts.

// The Case Studies page: every card, plus the order set in Studio (Case Study Order)
export const CASE_STUDIES_QUERY = defineQuery(`{
  "caseStudies": *[_type == "case-study"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    description,
    platform,
    workedWith,
  },
  "order": *[_id == "case-study-order"][0].caseStudies[]._ref,
}`)

// Every case study page, fetched once at build time and handed to each page (getStaticPaths)
export const CASE_STUDY_PAGES_QUERY = defineQuery(`*[_type == "case-study" && defined(slug.current)] {
  title,
  slug,
  mainImage,
  publishedAt,
  description,
  services,
  body,
  liveUrl,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
}`)
