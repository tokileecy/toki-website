## Why

Once the new app reaches visual parity (shell + scene + transitions + content),
it should become the live site. This final change handles the production
cutover: SEO/analytics/fonts/assets parity, pointing Firebase Hosting at the new
app's export, and keeping the legacy site reachable as a frozen exhibit.

## What Changes

- Port the remaining production assets: the custom font `xingothic-tc` (legacy
  loaded it via the justfont script), favicon, and sprite assets.
- Reproduce SEO parity using the App Router metadata API: per-route document
  titles and meta description matching legacy, plus a sitemap.
- Add Google Tag Manager (legacy `GTM-WDW2RJB`) to the new app.
- Add a CI build/deploy path for the new app and switch the repo-root
  `firebase.json` hosting `public` from `apps/toki-website-legacy/out` to
  `apps/toki-website/out`.
- Keep the legacy site reachable as a frozen exhibit (e.g. a separate hosting
  target/path), so the 2022 version remains a live portfolio piece.
- Run a final parity check against legacy before promoting.

Non-goals:
- No new visual features; this is parity + go-live only.
- The deferred "small visual refinements" pass happens after cutover, separately.

## Capabilities

### New Capabilities
- `production-deployment`: Serving the new app in production via Firebase static
  hosting with SEO/analytics/fonts/assets parity, the CI build/deploy path, and
  the legacy site preserved as a reachable frozen exhibit.

### Modified Capabilities
<!-- None at the spec level; this realizes deployment, it doesn't change earlier specs. -->

## Impact

- Repo-root `firebase.json` hosting target switches to the new app's export.
- `.github/workflows` gain build/deploy for `apps/toki-website` (Node 22); the
  legacy workflows remain for the exhibit.
- New app gains font loading, favicon/sprites, metadata, sitemap, and GTM.
- Production traffic moves to the new app; legacy stays available at a separate
  location.
