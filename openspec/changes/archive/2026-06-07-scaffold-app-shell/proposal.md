## Why

The renovation needs a modern foundation before any 3D, content, or transition
work can land. This change establishes that foundation: a fresh `apps/toki-website`
on the target stack (Next 15 App Router + RSC, React 19, Tailwind v4) with the
structural skeleton every later change builds on — the three routes and the
persistent full-screen canvas that is the heart of the "3D never unmounts" feel.
The deliverable is a deployable empty shell, so the new stack is proven end to
end (dev, build, static export) before we port pixels.

## What Changes

- Scaffold a new self-contained app at `apps/toki-website`: Next 15 (App Router),
  React 19, TypeScript, Tailwind v4, pnpm, Node 22. Configured for static export
  (`output: 'export'`) with the legacy basePath/trailingSlash behavior.
- Add the three routes `home` (`/`), `about` (`/about`), `work` (`/work`) as
  placeholder pages.
- Add a root layout that permanently mounts a full-screen React Three Fiber
  `<Canvas>` behind the page content, with an empty scene for now. The canvas
  lives in the layout so it never unmounts across route changes. Page content
  renders in a layer above it.
- Reproduce the base visual frame exactly: black page background and a
  transparent canvas (matching the legacy `setClearColor(0xffffff, 0)` + black
  root), so the empty shell already matches the legacy "stage".
- Derive Tailwind v4 `@theme` tokens from the legacy `styles/baseStyles.ts`
  (colors incl. primary cyan `#01ecf9`, breakpoints, font sizes).
- Set up GLSL (`.glsl`/`.vert`/`.frag`) imports for the new toolchain (replacing
  the legacy webpack raw-loader + glslify), so later 3D work can import shaders.

Non-goals (deferred to later changes):
- No 3D scene content yet — the canvas renders an empty scene.
- No real page content, layout, or components (those are `page-content`).
- No route-driven scene transitions (those are `scene-route-transitions`).
- No hosting cutover — Firebase still serves the legacy app until parity.

## Capabilities

### New Capabilities
- `site-shell`: The App Router structure for the three routes, the root layout
  that permanently mounts the full-screen 3D canvas above which page content
  renders, the static-export build configuration, the Tailwind v4 theme derived
  from the legacy design tokens, and GLSL import support.

### Modified Capabilities
<!-- None. This is the first change; openspec/specs/ is empty. -->

## Impact

- New directory `apps/toki-website` (self-contained: own package.json, lockfile,
  Node 22, dependencies).
- New dependencies: next@15, react@19, react-dom@19, tailwindcss@4,
  @react-three/fiber, @react-three/drei, three, plus a GLSL import plugin/loader.
- No changes to `apps/toki-website-legacy`.
- Repo root `firebase.json` is unchanged in this change (still points at the
  legacy export); a build path for the new app may be added to CI but is not
  promoted to production hosting yet.
- Establishes the conventions (App Router layout, persistent canvas mount point,
  theme tokens, GLSL imports) that changes ②–④ depend on.
