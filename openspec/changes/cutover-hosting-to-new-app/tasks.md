## 1. Fonts and assets

- [ ] 1.1 Port the `xingothic-tc` font (self-hosted/`next/font`, or the justfont method if faces differ)
- [ ] 1.2 Port favicon and sprite assets

## 2. SEO and analytics

- [ ] 2.1 Add per-route metadata (titles + description) via the App Router metadata API, matching legacy
- [ ] 2.2 Generate a sitemap
- [ ] 2.3 Add the GTM container (`GTM-WDW2RJB`)

## 3. CI build/deploy for the new app

- [ ] 3.1 Add a build/deploy workflow path for `apps/toki-website` (Node 22, static export)
- [ ] 3.2 Produce a preview deploy of the new app and verify it serves correctly

## 4. Parity check

- [ ] 4.1 Compare the new app against legacy across home/about/work (visual + SEO/meta)
- [ ] 4.2 Record any gaps and resolve before promotion

## 5. Cutover

- [ ] 5.1 Set up the legacy exhibit on its own hosting target/path and confirm it stays reachable
- [ ] 5.2 Switch root `firebase.json` `public` to `apps/toki-website/out` and update the deploy workflow
- [ ] 5.3 Deploy to production; verify the new app is live and legacy still loads
- [ ] 5.4 Document the rollback (revert `firebase.json` path + workflow)
