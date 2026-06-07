## ADDED Requirements

### Requirement: Three-route App Router structure

The new app SHALL expose exactly three routes — `home` at `/`, `about` at
`/about`, and `work` at `/work` — implemented with the Next.js App Router. Each
route SHALL render its own page within the shared root layout.

#### Scenario: Home route renders

- **WHEN** a visitor navigates to `/`
- **THEN** the home page renders within the root layout

#### Scenario: About route renders

- **WHEN** a visitor navigates to `/about`
- **THEN** the about page renders within the root layout

#### Scenario: Work route renders

- **WHEN** a visitor navigates to `/work`
- **THEN** the work page renders within the root layout

### Requirement: Persistent full-screen 3D canvas

The root layout SHALL mount a single full-screen React Three Fiber `<Canvas>`
that renders behind all page content. The canvas MUST remain mounted across
client-side route changes between the three routes (it MUST NOT remount), so the
3D scene is continuous. Page content SHALL render in a layer above the canvas.

#### Scenario: Canvas persists across navigation

- **WHEN** a visitor moves between `/`, `/about`, and `/work` via client-side navigation
- **THEN** the canvas element is not unmounted or recreated, and the same WebGL context is retained

#### Scenario: Content renders above canvas

- **WHEN** any route is displayed
- **THEN** the page content is layered above the canvas and is interactive, while the canvas fills the viewport behind it

### Requirement: Static export build

The app SHALL build as a static export (`output: 'export'`) that can be served
as static files, preserving the legacy `trailingSlash` behavior and honoring a
configurable `basePath`.

#### Scenario: Production build produces static output

- **WHEN** the production build runs
- **THEN** it completes successfully and emits a static `out/` directory servable without a Node server

### Requirement: Base visual stage matches legacy

The empty shell SHALL reproduce the legacy base stage: the page background is
black and the canvas clears transparent, so the 3D layer composites over black.

#### Scenario: Empty shell visual

- **WHEN** the shell loads with an empty scene
- **THEN** the viewport shows a black background and the transparent canvas adds nothing visible, matching the legacy base stage

### Requirement: Design tokens exposed as Tailwind theme

The app SHALL expose the legacy design tokens — colors (including primary cyan
`#01ecf9`), breakpoints, and font sizes from `styles/baseStyles.ts` — as
Tailwind v4 `@theme` tokens for use throughout the app.

#### Scenario: Token usage in styling

- **WHEN** a component is styled using a theme token (e.g. the primary color or a defined breakpoint)
- **THEN** the rendered value matches the corresponding legacy token value

### Requirement: GLSL module imports

The build SHALL allow importing GLSL shader files (`.glsl`, `.vert`, `.frag`) as
their source strings, so 3D materials in later changes can consume the ported
shaders.

#### Scenario: Importing a shader file

- **WHEN** a module imports a `.glsl`/`.vert`/`.frag` file
- **THEN** the import resolves to the shader source as a string usable by a Three.js material
