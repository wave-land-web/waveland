import netlify from '@astrojs/netlify'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://wavelandweb.com/',
  prefetch: {
    prefetchAll: true,
  },
  scopedStyleStrategy: 'class',
  integrations: [
    sitemap({
      lastmod: new Date(),
    }),
    icon(),
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
    // Netlify image CDN must be disabled as of 01/25/2024 so the build doesn't break - see: <https://docs.astro.build/en/guides/integrations-guide/netlify/#netlify-image-cdn-support>
    imageCDN: false,
    cacheOnDemandPages: true,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    // SEE: https://docs.astro.build/en/reference/experimental-flags/fonts/#local-font-variants
    fonts: [
      {
        provider: 'local',
        name: 'Monaspace Argon Var',
        cssVariable: '--font-monaspace',
        variants: [
          {
            src: [
              './src/assets/fonts/monaspace-argon-var-regular.woff2',
              './src/assets/fonts/monaspace-argon-var-regular.woff',
            ],
            weight: '400',
            style: 'normal',
          },
        ],
      },
      {
        provider: 'local',
        name: 'Poppins Regular',
        cssVariable: '--font-poppins',
        variants: [
          {
            src: [
              './src/assets/fonts/poppins-regular.woff2',
              './src/assets/fonts/poppins-regular.woff',
            ],
            weight: '400',
            style: 'normal',
          },
        ],
      },
    ],
  },
})
