## Context

The legacy scene (`apps/toki-website-legacy/manager/`) is built imperatively:
`scene.ts` assembles `wireframe3D`, `grid3D`/`grid3D1`, and `train1/2/3`; geometry
comes from `createGrid3D`/`createTrain`; materials are `THREE.ShaderMaterial`
merging `THREE.UniformsLib.fog` with `color` (cyan), `lineWidth`, and `alpha`;
the GLSL is trivial (`gl_FragColor = vec4(color, alpha)` plus fog includes). The
flythrough is two GSAP `repeat(-1)` tweens on grid `position.z`. The render loop
lived in `@psycholog-studio/ui`'s LayerController; only `renderWebgl()` ran per
frame (CSS3D was unused). This change re-expresses all of that declaratively in
R3F inside the persistent canvas from `site-shell`.

## Goals / Non-Goals

**Goals:**
- Pixel-faithful reproduction of the tunnel, trains, wireframe, fog, and camera.
- Replace the imperative ThreeManager loop with R3F's `useFrame`.
- Keep the GLSL shaders and geometry math byte-for-byte from legacy.

**Non-Goals:**
- Route transitions / `alpha` animation (next change) — render the home state.
- Any DOM/UI/Tailwind work.

## Decisions

### Reuse legacy geometry + GLSL verbatim
Port `createGrid3D` and `createTrain` and the `shaders/` files unchanged; wrap
the shaders with a material (drei `shaderMaterial` factory or a plain
`<shaderMaterial>` with `THREE.UniformsUtils.merge([UniformsLib.fog, …])`).
Rationale: identical math + identical shaders ⇒ identical pixels. Alternative
(rewriting as drei `<Line>`/materials) rejected: risks visual drift.

### Declarative scene graph with `<primitive>` where helpful
Express grids/trains/wireframe as R3F components. Where a helper returns a ready
`THREE.LineSegments`, mount via `<primitive object={…} />`; otherwise build with
JSX `<lineSegments>` + `<bufferGeometry>`/`<shaderMaterial>`. Rationale: smallest
faithful translation, minimal re-derivation.

### Flythrough via `useFrame` (not GSAP)
Drive the two grids' `position.z` in a `useFrame` loop replicating the legacy
22s linear cycle and leapfrog offsets. Rationale: keeps the motion inside R3F's
loop (one source of truth), no extra animation lib for a linear translate.
Alternative (keep GSAP) viable but adds a dependency for a trivial linear tween.

### Fog and uniforms on materials
Set `scene.fog = Fog(0x000000, 800, 1700)` (R3F `<fog>`), enable `material.fog`,
and merge `UniformsLib.fog` so the fog includes in the shaders work. `color`
uniform = primary cyan; `alpha` uniform initialized to the home values (grid
0.1, train 1.0).

## Risks / Trade-offs

- [useFrame timing differs subtly from GSAP's 22s tween] → Match cycle duration
  and easing (linear); verify side-by-side against legacy.
- [Shader fog chunk version differences across three versions] → Pin `three`;
  the fog includes are stable, but confirm against the bumped three version.
- [Geometry helper assumptions about units/scale] → Port verbatim and compare
  rendered framing with the legacy camera before tweaking.

## Open Questions

- Exact per-train placement/animation lives in legacy `trains.ts` (not yet read
  in detail); port it verbatim when implementing.
- Whether to expose the `alpha` uniforms via a small store hook now so the next
  change (transitions) can drive them, or wire that in the transitions change.
