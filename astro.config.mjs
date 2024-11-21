import netlify from '@astrojs/netlify'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import sanity from '@sanity/astro'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

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
    partytown(),
    sanity({
      projectId: 'uuas57um',
      dataset: 'production',
      apiVersion: '2024-10-20',
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: '/studio',
    }),
    react(),
  ],
  adapter: netlify({
    imageCDN: false,
    cacheOnDemandPages: true,
  }),
})
