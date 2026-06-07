## 1. Scaffold project

- [ ] 1.1 Create `apps/toki-website` with create-next-app (App Router, TypeScript, pnpm)
- [ ] 1.2 Pin Node 22 (`.nvmrc`) and add `dev`/`build` scripts (dev on a dedicated port)
- [ ] 1.3 Add dependencies: `tailwindcss@4`, `@react-three/fiber`, `@react-three/drei`, `three`
- [ ] 1.4 Configure `next.config` for `output: 'export'`, `trailingSlash: true`, and env-driven `basePath`

## 2. App Router routes

- [ ] 2.1 Add `app/page.tsx` (home) placeholder
- [ ] 2.2 Add `app/about/page.tsx` placeholder
- [ ] 2.3 Add `app/work/page.tsx` placeholder
- [ ] 2.4 Confirm each route renders within the shared root layout

## 3. Persistent canvas + base stage

- [ ] 3.1 Create a `'use client'` `<SceneCanvas>` component with an R3F `<Canvas>` fixed full-viewport, transparent clear (`gl={{ alpha: true }}`), empty scene
- [ ] 3.2 Set camera to legacy stage values: FOV 45, near 10, far 2000, position z 1000
- [ ] 3.3 Mount `<SceneCanvas>` in `app/layout.tsx` behind `{children}`; render page content in a layer above it
- [ ] 3.4 Set the page background to black (body) so the transparent canvas composites over black, matching the legacy stage
- [ ] 3.5 Verify the canvas does not remount when navigating between `/`, `/about`, `/work`

## 4. Tailwind v4 theme tokens

- [ ] 4.1 Set up Tailwind v4 (CSS-first) in the app
- [ ] 4.2 Translate legacy `styles/baseStyles.ts` colors into `@theme` tokens (incl. primary cyan `#01ecf9`, full grayscale, warning/complementary)
- [ ] 4.3 Translate legacy breakpoints and font sizes into `@theme` tokens
- [ ] 4.4 Verify a token-styled element renders the same value as its legacy counterpart

## 5. GLSL import support

- [ ] 5.1 Configure the bundler to import `.glsl`/`.vert`/`.frag` as raw source strings (or adopt the TS-string fallback)
- [ ] 5.2 Add a throwaway import test proving a shader file resolves to a usable source string, then remove it

## 6. Verify shell end to end

- [ ] 6.1 `pnpm dev` runs; all three routes load with the black stage
- [ ] 6.2 `pnpm build` produces a static `out/` export with no server requirement
- [ ] 6.3 Confirm legacy app and its hosting are untouched (firebase.json still points at the legacy export)
