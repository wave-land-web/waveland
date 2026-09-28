# Wave Land

Source for [wavelandweb.com](https://wavelandweb.com): Astro, Sanity and Tailwind, hosted on Netlify.

## Setup

```sh
cp .env.example .env
npm install
npm run dev
```

The site runs at http://localhost:4321, and Sanity Studio at http://localhost:4321/admin.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (`npx astro dev stop` stops it) |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the build locally |

Check styling changes on a build or the Netlify deploy preview, not only the dev server. Production CSS loads in a different order.

## Where things live

- `src/pages/`: routes. Case studies come from Sanity (`src/pages/case-studies/[slug].astro`).
- `src/sanity/`: Studio schema and structure.
- `src/lib/site.ts`: shared values (email, Calendly link).
- `src/lib/data/testimonials.ts`: homepage testimonials.
- `public/_headers` and `public/_redirects`: Netlify headers and redirects. Page redirects live in `astro.config.mjs`.

## Deploys

Pushes to `main` deploy to production. Pull requests get a Netlify deploy preview.
