import netlify from '@astrojs/netlify'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig, fontProviders } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://wavelandweb.com/',
  prefetch: {
    prefetchAll: true,
  },
  scopedStyleStrategy: 'class',
  image: {
    responsiveStyles: true,
    layout: 'full-width',
  },
  adapter: netlify({
    imageCDN: false,
    cacheOnDemandPages: true,
  }),
  integrations: [
    sitemap({
      lastmod: new Date(),
      filter: (page) => page !== 'https://wavelandweb.com/pricing/' && !/\/blog/.test(page),
    }),
    icon(),
    partytown(),
    sanity({
      projectId: 'uuas57um',
      dataset: 'production',
      apiVersion: '2024-10-20',
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: '/admin',
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    // SEE: https://docs.astro.build/en/reference/experimental-flags/fonts/#local-font-variants
    fonts: [
      {
        provider: fontProviders.local(),
        name: 'Monaspace Argon Var',
        cssVariable: '--font-monaspace',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/monaspace-argon-var-extra-light.woff2',
                './src/assets/fonts/monaspace-argon-var-extra-light.woff',
              ],
              weight: 400,
              style: 'normal',
            },
          ],
        },
      },
      {
        provider: fontProviders.local(),
        name: 'Poppins Regular',
        cssVariable: '--font-poppins',
        options: {
          variants: [
            {
              src: [
                './src/assets/fonts/poppins-regular.woff2',
                './src/assets/fonts/poppins-regular.woff',
              ],
              weight: 400,
              style: 'normal',
            },
          ],
        },
      },
    ],
  },
})
