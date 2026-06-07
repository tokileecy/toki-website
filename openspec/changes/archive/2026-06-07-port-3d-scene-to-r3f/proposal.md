## Why

With the shell in place (`scaffold-app-shell`), the next slice brings back the
soul of the site: the endless cyan wireframe tunnel. This change reproduces the
legacy Three.js scene inside the persistent React Three Fiber canvas, pixel for
pixel, so the new site looks like the old one. It also retires the 3D half of the
internal `@psycholog-studio/ui` (its `ThreeManager`/`LayerController`), replacing
the imperative render loop with R3F.

## What Changes

- Recreate the legacy scene in R3F: black fog (`Fog(0x000000, 800, 1700)`), the
  two leapfrogging grids, the three trains, and the wireframe object.
- Port the geometry helpers (`createGrid3D`, `createTrain`) and the GLSL shaders
  unchanged, wrapped as R3F materials (`shaderMaterial` / `<shaderMaterial>`),
  fed the same uniforms (fog, `color` = primary cyan `#01ecf9`, `alpha`).
- Reproduce the continuous flythrough: the grids translate toward the camera on
  a ~22s linear loop and leapfrog (legacy `grid3D` z 200→2200, `grid3D1`
  z -1800→200), driven by R3F's frame loop.
- Render the scene in its immersive (home) state by default — the per-route fade
  is added in the next change.
- Remove the dependency on `@psycholog-studio/ui`'s ThreeManager/LayerController
  in the new app (no CSS3D renderer — it was unused by legacy).

Non-goals (later changes):
- No route-driven fade transitions yet (`scene-route-transitions`).
- No DOM/page content or Tailwind UI work (`page-content`).

## Capabilities

### New Capabilities
- `webgl-tunnel-scene`: The faithful R3F reproduction of the legacy 3D scene —
  the grids, trains, wireframe, fog, camera, the continuous flythrough loop, and
  the ported GLSL shader materials — rendered in the persistent canvas.

### Modified Capabilities
<!-- None at the spec level. Builds on site-shell's canvas; does not change its requirements. -->

## Impact

- New 3D modules in `apps/toki-website` (scene components, materials, geometry
  helpers); GLSL shader files ported from the legacy app verbatim.
- Uses `three` + `@react-three/fiber` (+ `drei` helpers) already added by the
  shell change.
- Establishes the scene objects and their uniforms (especially `alpha`) that
  `scene-route-transitions` will animate.
