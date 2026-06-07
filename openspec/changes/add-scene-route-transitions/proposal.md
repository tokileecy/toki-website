## Why

The tunnel is back (`port-3d-scene-to-r3f`), but static. This change restores
the site's signature interaction: home is an immersive 3D flythrough, and
navigating to about/work fades the 3D out so the content is readable, while
returning home fades it back. It replaces the legacy imperative flow
(GSAP-promise `animation()`/`invertAnimation()` + the `AppContext.isAnimating`
React context) with a zustand store driving R3F's frame loop.

## What Changes

- Add a zustand store holding the scene mode derived from the current route:
  `immersive` on home, `content` on about/work.
- On route change, fade the 3D toward the target state via R3F `useFrame`
  interpolation of the `alpha` uniforms, matching legacy targets (grid 0.1↔0,
  train 1.0↔0) and the ~0.5s ease feel.
- Mirror the legacy UI chrome behavior inversely: the header/footer/nav are
  hidden in the immersive home state and shown in content states.
- Make transitions interruptible so rapid navigation re-targets smoothly without
  getting stuck (improving on the legacy promise-chained flow).
- Respect the initial route on first load / deep link (e.g. landing on `/about`
  starts in the faded content state).

Non-goals (later changes):
- The actual page content/layout and Tailwind styling of the chrome
  (`page-content`) — this change only toggles visibility/opacity state.

## Capabilities

### New Capabilities
- `scene-route-transitions`: The route-driven behavior that fades the 3D scene
  between the immersive (home) and content (about/work) states and inversely
  shows/hides the UI chrome, driven by a zustand store and interruptible.

### Modified Capabilities
<!-- None at the spec level. Animates the alpha uniforms exposed by webgl-tunnel-scene. -->

## Impact

- Adds `zustand` and a scene store to `apps/toki-website`.
- Wires route changes (App Router navigation) to the store; the scene components
  from `webgl-tunnel-scene` read the store in `useFrame` to drive `alpha`.
- Introduces the chrome visibility state that `page-content` will later style.
