## Context

Legacy production: a single Firebase Hosting target (`tokileecy-website`) serving
the static export, deployed by `.github/workflows/firebase-hosting-*.yml`; SEO
via per-route document titles (`PageInfosContext`) + a static `public/sitemap.xml`
+ a meta description in `_app.tsx`; GTM `GTM-WDW2RJB` injected in `_document.tsx`;
the `xingothic-tc` font loaded via `public/scripts/justfont.js`. The monorepo
root `firebase.json` currently points at `apps/toki-website-legacy/out`. This
change promotes the new app and preserves the legacy one as an exhibit.

## Goals / Non-Goals

**Goals:**
- New app live in production with SEO/analytics/font/asset parity.
- Legacy preserved and reachable (frozen exhibit).
- A safe, verifiable cutover.

**Non-Goals:**
- New features or the deferred visual-refinement pass.

## Decisions

### Switch the root firebase target to the new app
Point `firebase.json` `public` at `apps/toki-website/out` and update the deploy
workflow to build the new app (Node 22). Rationale: minimal change to flip
production. Alternative (separate Firebase project) unnecessary for the main
site.

### Keep legacy reachable via a separate hosting location
Preserve the legacy exhibit on its own Firebase Hosting site/target (or a path),
keeping its existing workflow. Rationale: the 2022 site stays a live portfolio
piece without blocking the main domain. Exact target (subdomain vs path) decided
at implementation.

### SEO via App Router metadata API
Replace the legacy per-route title context and `_app`/`_document` injection with
`generateMetadata`/`metadata` per route and a generated sitemap. Rationale:
idiomatic App Router; keeps titles/description identical to legacy.

### Fonts and assets
Port the `xingothic-tc` font (prefer a self-hosted/`next/font` approach over the
justfont script if it preserves the exact faces) plus favicon and sprites.
Rationale: parity with better loading control; fall back to the original script
if the faces differ.

## Risks / Trade-offs

- [Cutover breaks production if export path/config is wrong] → Verify a preview
  deploy of the new app first; flip `public` only after parity check; rollback is
  reverting the `firebase.json` path.
- [Font swap changes text metrics] → Compare typography against legacy; if
  `next/font` differs, retain the justfont loading method.
- [Legacy and new competing for the same hosting target] → Use distinct
  targets/sites so neither overwrites the other.

## Migration Plan

1. Land fonts/assets/SEO/GTM on the new app behind a preview deploy.
2. Run the parity check across the three routes.
3. Add/adjust the legacy exhibit hosting target.
4. Switch root `firebase.json` `public` to the new app and update the deploy
   workflow; deploy.
5. Rollback: revert the `firebase.json` path and workflow to the legacy export.

## Rollback Procedure

If the new app needs to be rolled back to legacy as the primary site:

1. In `firebase.json`, swap the `main` target's `public` back to `apps/toki-website-legacy/out`.
2. In `.github/workflows/firebase-hosting-merge.yml`, change `working-directory` back to `apps/toki-website-legacy`, restore `node-version: '18'` and `pnpm version: 7`.
3. Do the same in `.github/workflows/firebase-hosting-pull-request.yml`.
4. Push to `main` — CI will build legacy and deploy it to the `main` target.
5. The `legacy` target/site is unaffected and continues to serve the exhibit at its subdomain.

## Resolved Questions

- Legacy exhibit at subdomain: `legacy.tokileecy.com` (Firebase Hosting site `tokileecy-website-legacy`).
  The site must be created in the Firebase console before the first deploy.
- Font loading: retained the original justfont script (`public/scripts/justfont.js`) as `next/font`
  does not support the justfont CDN faces directly.
