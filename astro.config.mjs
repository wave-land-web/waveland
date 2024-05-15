import db from '@astrojs/db'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './src/util/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://waveland-redesign.netlify.app/',
  output: 'server',
  prefetch: true,
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
    }),
    icon(),
    tailwind({
      nesting: true,
    }),
    db(),
    mdx(),
  ],
  adapter: netlify({
    cacheOnDemandPages: true,
  }),
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
})
