# CLAUDE.md

This repo is public. Keep business strategy, pricing, client terms and anything private out of it, including this file. Put working notes and drafts in `docs/content/`, which is gitignored.

Setup, commands, the folder layout and the design system are all in [README.md](README.md). Read it first.

## Working here

- **Branches and PRs.** Never commit to `main`. Work goes on a branch, uncommitted, until Josh asks to commit.
- **"Merge"** means: commit, push, open a PR, wait for the Netlify deploy preview check, merge with `gh pr merge <n> --merge --delete-branch`, then check out `main` and pull.
- **Commit messages:** `(type): what changed, in plain words`, for example `(fix): …`, `(feature): …`, `(copy): …`, `(style): …`, `(docs): …`. Keep PR descriptions short and plain.
- **No AI attribution** in commits, PRs or code comments.
- **Check styling on a production build** (`npm run build`, then serve `dist`) or the deploy preview, not only `astro dev`. Production CSS loads in a different order.
- **Comments** explain why, in plain sentences, matching the existing density. Shared values (email, Calendly link) live in `src/lib/site.ts`.

## Copy on the site

- First person ("I"), plain, warm, direct. No em dashes, and no exclamation points outside client quotes.
- The brand is "Wave Land", never "Wave Land Web". Say "creative agencies", never "brand agencies".
- The audience is growing businesses first and creative agencies second.
- No prices or price ranges anywhere on the site.
- Propose copy changes before making them.
- Case study copy lives in Sanity, not in this repo. Edits are saved as drafts and published only when Josh says so.

## Contact form

`src/pages/api/contact.ts` handles the form, in this order:

1. Akismet screens the message for spam. Spam goes to Netlify Forms only, flagged.
2. A real message goes to HubSpot and to Netlify Forms (the backup).
3. Resend sends the sender an auto-reply (`src/emails/ContactAutoReply.tsx`).

Keep the field names in step across `src/pages/contact.astro`, `public/__forms.html` and the API route. Env vars (Netlify, Functions scope): `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID`, `RESEND_API_KEY`, `AKISMET_API_KEY`. Secrets are set in Netlify, never committed.

## Known false positives

The Astro dev toolbar flags two things that are deliberate:

- **`tabindex="-1"` on the process steps:** it lets the step list move focus to a step, and it never makes the step a Tab stop.
- **Eager-loading on the marquee logos:** lazy logos would slide into the moving strip blank.

Leave both as they are.
