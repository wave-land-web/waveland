import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import tailwindcss from '@tailwindcss/vite'
import { fonts, iconOptions } from '@wave-land-web/design/config'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

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
    // The logo and wordmark live in the design package, with the SVGO settings that keep their IDs from colliding
    icon(iconOptions),
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
  // Astro 7 defaults to JSX-style whitespace; keep the HTML output it had before
  compressHTML: true,
  // Monaspace and Poppins, from the design package; Layout.astro loads them with <Font>
  fonts,
})
