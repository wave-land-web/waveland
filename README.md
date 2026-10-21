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

| Command           | What it does                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `npm run dev`     | Start the dev server (`npx astro dev stop` stops it)                                       |
| `npm run build`   | Type-check, then build to `dist/`                                                          |
| `npm run preview` | Serve the build locally                                                                    |
| `npm run lint`    | Check the code with ESLint                                                                 |
| `npm run format`  | Format everything with Prettier (`npm run format:check` only checks)                       |
| `npm run typegen` | Regenerate Sanity types after changing the schema or a query (`src/sanity/lib/queries.ts`) |

Check styling changes on a build or the Netlify deploy preview, not only the dev server. Production CSS loads in a different order.

## Where things live

- `src/pages/`: routes. Case studies come from Sanity (`src/pages/case-studies/[slug].astro`), and `/case-studies/` has platform filters (`?platform=`).
- `src/components/`:
  - `case-study/`: cards, the case study header and the table of contents.
  - `layout/`: navigation, footer and the logo marquee.
  - `portable-text/`: how Sanity body content renders.
  - `ui/`: site sections and pieces (the process steps, founder, testimonials, images and the closing CTA).
- `@wave-land-web/design` (in `node_modules`): the design system and the shared components (`CTA`, `Link`, `ArrowIcon`, `Pill`, `PageHeader` and the rest). See [Design system](#design-system).
- `src/sanity/`: Studio schema, structure, queries and image URLs. Every GROQ query lives in `lib/queries.ts`, and its result type in the generated `sanity.types.ts`. Case study order is set in Studio (Case Study Order), and the first one is featured.
- `src/assets/logos/`: marquee logos. Add the SVG here and its slug and name to the list in `src/components/layout/Marquee.astro`; logos are sized to equal visual weight.
- `src/lib/site.ts`: shared values (email, Calendly link).
- Homepage testimonials are edited in Studio (Website → Testimonials), ordered by each one's Order number.
- `public/_headers` and `public/_redirects`: Netlify headers and redirects. Page redirects live in `astro.config.mjs`.
- `docs/content/`: drafts and working files (gitignored).

## Design system

The tokens, utilities, fonts, motion and shared components come from the design package, [wave-land-web/design](https://github.com/wave-land-web/design), installed at a version tag. Its README has the rules (also at `node_modules/@wave-land-web/design/README.md`). Use the tokens and utilities rather than raw values.

`src/styles/global.css` imports the package and adds the two site-only rules: the nav's current-page color and the case study prose.

To change the design system, change it in that repo and tag a release, then bump the tag in `package.json` and check the deploy preview.

## Deploys

Pushes to `main` deploy to production. Pull requests get a Netlify deploy preview.
