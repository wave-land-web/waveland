import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://wavelandweb.com',
  output: 'hybrid',
  scopedStyleStrategy: 'class',
  integrations: [
    sitemap({
      lastmod: new Date(),
    }),
    icon(),
    tailwind({
      nesting: true,
    }),
  ],
})