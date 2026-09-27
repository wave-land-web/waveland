import netlify from '@astrojs/netlify'
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
  redirects: {
    // Pricing page was retired; send old links to the contact form
    '/pricing': '/contact/',
    // Creative Archetype quiz was retired
    '/creative-archetype': '/',
    // Blog was retired (post and tag URLs are covered in public/_redirects)
    '/blog': '/',
    // Retired case studies (agency repositioning); their quotes stay on the homepage
    '/case-studies/robby-webb': '/case-studies/',
    '/case-studies/lauren-vogelstein-phd': '/case-studies/',
    '/case-studies/power-passenger-passage': '/case-studies/',
  },
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
      // Keep utility pages out of the sitemap
      filter: (page) => !/\/(success|unsubscribed)\/$/.test(page),
    }),
    icon({
      // Keep the logo SVGs' prefixed IDs; SVGO's default renames them to "a", "b"... which collide
      // when several logos share a page
      svgoOptions: {
        plugins: [{ name: 'preset-default', params: { overrides: { cleanupIds: false } } }],
      },
    }),
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
