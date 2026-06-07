## ADDED Requirements

### Requirement: Route determines scene mode

The scene mode SHALL be derived from the current route: `immersive` on home
(`/`) and `content` on about (`/about`) and work (`/work`). A zustand store MUST
be the single source of truth for this mode.

#### Scenario: Mode reflects route

- **WHEN** the active route changes between home and about/work
- **THEN** the store's scene mode updates to `immersive` or `content` accordingly

### Requirement: 3D fades between immersive and content states

On entering a content route the 3D SHALL fade out by interpolating the `alpha`
uniforms toward the legacy content targets (grid 0, train 0); on returning home
it SHALL fade back to the immersive targets (grid 0.1, train 1.0), over roughly
the legacy ~0.5s eased duration.

#### Scenario: Fade out to content

- **WHEN** the visitor navigates from home to about or work
- **THEN** the tunnel and trains fade out smoothly until the content state is fully reached

#### Scenario: Fade back to immersive

- **WHEN** the visitor navigates from about or work back to home
- **THEN** the tunnel and trains fade back in to the immersive state

### Requirement: UI chrome shown inversely to immersion

The UI chrome (header/footer/nav) SHALL be hidden in the immersive home state
and shown in the content states, matching the legacy inverse show/hide behavior.

#### Scenario: Chrome on content pages

- **WHEN** a content route is active
- **THEN** the header/footer/nav are visible

#### Scenario: Chrome hidden on home

- **WHEN** the home route is active
- **THEN** the header/footer/nav are hidden so the 3D is unobstructed

### Requirement: Transitions are interruptible

A new route change during an in-progress transition SHALL re-target the
animation toward the new state without getting stuck or snapping.

#### Scenario: Rapid navigation

- **WHEN** the visitor navigates again before a transition completes
- **THEN** the animation smoothly re-targets to the new state and settles

### Requirement: Initial route respected

On first load or deep link, the scene SHALL initialize directly in the state
matching the loaded route (no flash of the wrong state).

#### Scenario: Deep link to content

- **WHEN** the visitor loads `/about` or `/work` directly
- **THEN** the scene starts in the faded content state and the chrome is shown
