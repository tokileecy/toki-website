## 1. Scene store

- [x] 1.1 Add `zustand`; create `useSceneStore` with `mode` (`immersive` | `content`) and per-object `alpha` targets
- [x] 1.2 Define the target values: immersive (grid 0.1, train 1.0) and content (grid 0, train 0)

## 2. Route binding

- [x] 2.1 Add a client hook in the root layout that maps the App Router pathname to `mode`
- [x] 2.2 Initialize `mode` synchronously on first load so deep links start in the correct state

## 3. Frame-loop fade

- [x] 3.1 In the scene components, lerp each `alpha` uniform toward its store target every frame
- [x] 3.2 Tune damping so the settle time/curve matches the legacy ~0.5s `power2.inOut`
- [x] 3.3 Verify a mid-transition route change re-targets smoothly (interruptible)

## 4. Chrome visibility

- [x] 4.1 Toggle header/footer/nav visibility from `mode` (hidden on home, shown on content)
- [x] 4.2 Confirm chrome and 3D stay in lockstep across navigation

## 5. Verify against legacy

- [x] 5.1 Compare home→about, about→home, and deep-link-to-/work behavior with the legacy site
- [x] 5.2 Decide and document the nav-during-transition behavior (keep enabled vs disable)
  <!-- Decision: keep nav always enabled. Frame-loop re-targeting handles rapid clicks cleanly;
       no need to gate nav like the legacy promise-chain did. -->
