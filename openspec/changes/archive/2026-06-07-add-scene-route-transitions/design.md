## Context

Legacy wiring: `PageInfosContext.pushState` sets `AppContext.isAnimating`, awaits
`animation()` (alpha→0) or `invertAnimation()` (alpha→home), then clears the
flag. Each object animates its `alpha` uniform with a 0.5s `power2.inOut` GSAP
tween, run in parallel via `Promise.all`. `Layout` computes `show = page !==
home` to toggle header/footer/nav. The legacy fake-SPA also gated nav clicks
while animating. This change reproduces that behavior on the App Router with a
zustand store and R3F's frame loop.

## Goals / Non-Goals

**Goals:**
- Faithful home↔content fade with the legacy targets and feel.
- Inverse chrome show/hide.
- A clean, interruptible state model (one store, frame-loop interpolation).

**Non-Goals:**
- Styling/layout of the chrome and pages (that is `page-content`).
- Changing the scene composition (owned by `webgl-tunnel-scene`).

## Decisions

### zustand store as single source of truth
A `useSceneStore` holds `mode` (`immersive` | `content`) and the current target
`alpha` values. App Router navigation updates `mode`; scene components subscribe
and read targets in `useFrame`. Rationale: replaces the imperative
context+promise flow with declarative state; R3F officially recommends zustand.

### Frame-loop interpolation instead of awaited tweens
Scene components lerp each `alpha` uniform toward its target every frame (e.g.
damp/lerp tuned to ~0.5s settle). Rationale: inherently interruptible — changing
the target mid-flight just changes where it lerps to, fixing the legacy
promise-chain stalls. Alternative (port GSAP tweens) rejected: harder to
interrupt cleanly and adds a dependency.

### Route→mode binding in the layout
A small client hook reads the App Router pathname and sets `mode` in the store
(and initializes it on mount for deep links). Rationale: the persistent layout is
the natural place to observe route changes without unmounting the canvas.

### Chrome visibility from the same store
Header/footer/nav read `mode` to toggle visibility/opacity (inverse of
immersion). Rationale: one source of truth keeps 3D and chrome in lockstep, as
in legacy. Styling of these elements is deferred to `page-content`.

## Risks / Trade-offs

- [Lerp feel may not exactly match GSAP power2.inOut] → Tune the damping to match
  the legacy 0.5s curve; compare side-by-side.
- [Deep-link flash of wrong state] → Initialize the store from the pathname
  before first paint of the scene (set initial targets synchronously).
- [Nav spam causing visual jitter] → Frame-loop re-targeting handles this; no
  need to disable nav during transitions (legacy disabled it — we can keep nav
  enabled, an improvement).

## Open Questions

- Do we preserve the legacy behavior of disabling nav clicks while animating, or
  rely on interruptible transitions and keep nav always clickable? (Leaning:
  keep nav enabled.)
- Exact damping constant to best match the legacy 0.5s `power2.inOut` feel.
