## Why

With the 3D and transitions in place, the site still has no readable content.
This change rebuilds the home/about/work page content and layout with Tailwind
v4, faithfully reproducing the legacy pages, and moves the data into a typed TS
content model. It completes the removal of Emotion and the internal
`@psycholog-studio/ui` from the new app.

## What Changes

- Add a typed TS content model replacing `utils/tempDatas.json`: profile
  (name + rich-text description), skill categories (each with skills carrying a
  0–100 level), and works (each with name, url, and responsive banner data).
- Sanitize the profile rich-text/HTML before rendering (legacy used `xss`).
- Reproduce the three pages with Tailwind v4, matching the legacy layouts:
  - home: the intro/landing layer
  - about: bio + skills (categories, sub-skill blocks, per-skill level bars)
  - work: the portfolio blocks (banner + name + external link)
- Rebuild the shared UI pieces (Box, MessageBox-equivalents, Nav, scrollable
  content) as own components styled with Tailwind tokens.
- Reproduce DOM/CSS faithfully by porting exact computed values (px, colors,
  spacing) rather than re-idiomatizing; use arbitrary values or a small CSS
  module where utilities cannot express the original.
- Remove Emotion and `@psycholog-studio/ui` from `apps/toki-website` entirely.

Non-goals (later change):
- Hosting cutover, SEO/GTM, fonts, sitemap (`cutover-hosting-to-new-app`),
  though fonts may be pulled earlier if text-metric parity requires it.

## Capabilities

### New Capabilities
- `page-content`: The typed TS content model and the faithful Tailwind
  reproduction of the home/about/work page layouts and shared UI components that
  render it, with the profile rich-text sanitized.

### Modified Capabilities
<!-- None at the spec level. Consumes the chrome visibility state from scene-route-transitions. -->

## Impact

- New content modules and page/components in `apps/toki-website`.
- Removes Emotion (`@emotion/css`) and `@psycholog-studio/ui` dependencies from
  the new app; keeps an HTML sanitizer for the profile description.
- The chrome (header/footer/nav) whose visibility is driven by
  `scene-route-transitions` gets its final styling here.
