# Wave Land

Source for [wavelandweb.com](https://wavelandweb.com): Astro 7, Sanity and Tailwind 4, hosted on Netlify.

## Setup

Node 24 (see `.nvmrc`).

```sh
cp .env.example .env
npm install
npm run dev
```

The site runs at http://localhost:4321, and Sanity Studio at http://localhost:4321/admin.

## Commands

| Command           | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `npm run dev`     | Start the dev server (`npx astro dev stop` stops it)                 |
| `npm run build`   | Type-check, then build to `dist/`                                    |
| `npm run preview` | Serve the build locally                                              |
| `npm run lint`    | Check the code with ESLint                                           |
| `npm run format`  | Format everything with Prettier (`npm run format:check` only checks) |

Check styling changes on a build or the Netlify deploy preview, not only the dev server. Production CSS loads in a different order.

## Where things live

- `src/pages/`: routes. Case studies come from Sanity (`src/pages/case-studies/[slug].astro`), and `/case-studies/` has platform filters (`?platform=`).
- `src/components/`:
  - `case-study/`: cards, the case study header and the table of contents.
  - `layout/`: navigation, footer, page header and the logo marquee.
  - `portable-text/`: how Sanity body content renders.
  - `ui/`: small shared pieces (links, pills, CTAs, images).
- `src/sanity/`: Studio schema, structure, queries and image URLs. Case study order is set in Studio (Case Study Order), and the first one is featured.
- `src/assets/logos/`: marquee logos. Add the SVG here and its slug and name to the list in `src/components/layout/Marquee.astro`; logos are sized to equal visual weight.
- `src/lib/site.ts`: shared values (email, Calendly link).
- `src/lib/data/testimonials.ts`: homepage testimonials.
- `public/_headers` and `public/_redirects`: Netlify headers and redirects. Page redirects live in `astro.config.mjs`.
- `docs/content/`: drafts and working files (gitignored).

## Design system

Tokens and utilities live in `src/styles/global.css`. Use them rather than raw values.

- **Colors, fonts and type sizes:** Tailwind theme tokens (`text-purple`, `font-header`, `text-prose` and so on). No stray hex codes.
- **Radius:** `rounded-media` for images and cards, `rounded-control` for buttons and pills, `rounded-field` for inputs.
- **Spacing and widths:** `py-section`, `mb-header`, `pt-page-top`, `top-sticky`, `gap-split`, `stack`, `max-w-copy` and `max-w-narrow`.
- **Buttons and links:** `btn`, `btn-primary`, `btn-secondary` and `btn-toggle`, plus the `Link` component. Standalone links carry an arrow (`ArrowIcon`, `link-arrow`) that nudges on hover: → for a page on this site, ↗ for another site. Links inside copy are underlined; nav links just change color.
- **Motion:** `hero-in` for content above the fold and `lsa` for content that reveals on scroll. Stagger items with `style="--i: n"`, and reveal whole sections or cards, not single paragraphs. Timing uses `--transition`, `--duration-reveal`, `--duration-move`, `--ease-reveal` and `--stagger`.
- **Page transitions:** pages crossfade (View Transitions API) and the nav stays still. Reduced motion turns off every animation.

## Deploys

Pushes to `main` deploy to production. Pull requests get a Netlify deploy preview.
