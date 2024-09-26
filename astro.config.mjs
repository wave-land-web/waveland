import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://wavelandweb.com/',
  output: 'hybrid',
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
    }),
    icon(),
    tailwind({
      nesting: true,
    }),
    mdx(),
    partytown(),
  ],
  adapter: netlify({
    imageCDN: false,
    cacheOnDemandPages: true,
  }),
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'houston',
    },
  },
})
