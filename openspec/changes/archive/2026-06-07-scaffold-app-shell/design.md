## Context

The legacy app (`apps/toki-website-legacy`) renders a full-screen WebGL scene
behind a DOM UI layer. Investigation of its internal `@psycholog-studio/ui`
showed the library supports a dual WebGL + CSS3D renderer stack, but the app
**does not use the CSS3D layer at all** (no `cssLayerContent`, no
`ThreeCSSObject` in any source file). Effectively the legacy stage is just: a
transparent full-screen WebGL canvas (`setClearColor(0xffffff, 0)`) over a black
root, with DOM UI absolutely positioned on top. This change rebuilds that stage
on the new stack as an empty shell — no scene content yet.

Constraints: faithful reproduction of the base stage; static export for Firebase
Hosting; legacy `trailingSlash: true` and configurable `basePath`; the new app
is self-contained (own deps, Node 22) and must not touch the legacy app.

## Goals / Non-Goals

**Goals:**
- A deployable empty shell proving the new toolchain end to end (dev, build,
  static export).
- The persistent-canvas architecture that changes ②–④ build on.
- Legacy design tokens available as Tailwind v4 theme; GLSL import support ready.

**Non-Goals:**
- No 3D scene content, page content, transitions, or hosting cutover (later
  changes). The CSS3D renderer is intentionally not reproduced (unused by legacy).

## Decisions

### Scaffold: create-next-app (App Router, TS) + Tailwind v4 + R3F
Use `create-next-app` for `apps/toki-website` (App Router, TypeScript, Node 22),
then add `tailwindcss@4`, `@react-three/fiber`, `@react-three/drei`, `three`.
Rationale: standard, minimal custom config. Alternative (manual scaffold)
rejected — more setup, no benefit.

### Persistent canvas via a client component in the root layout
The root `app/layout.tsx` renders a single `'use client'` `<SceneCanvas>` fixed
to the viewport behind `{children}`. Route segments (`page.tsx`) are swapped by
the App Router while the layout — and therefore the canvas and its WebGL context
— stays mounted. Rationale: this is the idiomatic App Router way to keep a
persistent background across routes; it directly satisfies the "canvas never
unmounts" requirement. Alternative (canvas per page, or a parallel route slot)
rejected: per-page remounts the WebGL context; parallel routes add complexity
with no gain here.

### Static export compatibility
The `<Canvas>` is client-only; the rest of the tree can stay RSC. `output:
'export'` is compatible because the 3D is client-side rendered. Mark the canvas
subtree `'use client'`; keep pages as server components where possible.

### Canvas camera/stage set now
Configure the canvas to the legacy stage values up front: transparent clear
(`gl={{ alpha: true }}`, no scene background), black page background via the
body, camera FOV 45 / near 10 / far 2000 / position z 1000. Fog and scene
objects are added in change ②. Rationale: the camera/stage is part of the shell;
setting it now avoids churn later.

### Tailwind v4 `@theme` from legacy tokens
Translate `styles/baseStyles.ts` (hex color enums, breakpoints, font sizes) into
Tailwind v4 CSS-first `@theme` tokens (e.g. `--color-primary: #01ecf9`,
`--breakpoint-md: 60rem`, font-size scale). Rationale: v4 is CSS-first; tokens
become the single source of truth shared by DOM and (as plain hex) the 3D
materials.

### GLSL imports as raw strings
Keep shaders as `.glsl`/`.vert`/`.frag` files imported as source strings,
configured for the chosen bundler (a Turbopack/webpack rule, or the `?raw`
query). Rationale: preserves the legacy shader files verbatim with proper
syntax highlighting. Fallback if loader support is fragile: store shaders as TS
modules exporting template-literal strings (no bundler config). Decision recorded
as a fallback, not the default.

## Risks / Trade-offs

- [GLSL import support under Turbopack may be immature] → Start with the bundler
  rule; if it fights us, fall back to TS string modules (shaders are tiny/few).
- [Tailwind v4 is relatively new; `@theme` API churn] → Pin the version; keep the
  token layer thin and centralized so a future bump is localized.
- [R3F + static export hydration mismatch] → Canvas is client-only and renders
  nothing meaningful on the server; guard with `'use client'` and avoid SSR of
  WebGL. Low risk.
- [basePath differences between legacy and new hosting path] → Drive basePath
  from env as legacy does; finalize the value at the cutover change.

## Migration Plan

Purely additive: a new directory alongside the untouched legacy app. Nothing in
production changes — Firebase still serves the legacy export. Rollback is
trivial (delete the new directory); there is no runtime coupling until the
cutover change.

## Open Questions

- Turbopack vs webpack for the production build (affects the GLSL loader choice)?
- Final `basePath` for the new app's hosting path (resolved at cutover).
- The legacy custom font `xingothic-tc` (loaded via justfont) affects layout
  metrics; font wiring is scheduled for the cutover change but may need to land
  earlier if `page-content` parity depends on exact text metrics.
