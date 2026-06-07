## ADDED Requirements

### Requirement: Scene composition matches legacy

The scene SHALL contain the same objects as the legacy scene: two grid
line-segment objects, three trains, and a wireframe object, with black fog
matching `Fog(0x000000, 800, 1700)`, all rendered in the persistent canvas.

#### Scenario: Objects present

- **WHEN** the scene renders
- **THEN** the two grids, the three trains, and the wireframe object are all present with black distance fog

### Requirement: Continuous flythrough loop

The two grids SHALL translate toward the camera on a continuous ~22s linear loop
and leapfrog so the tunnel appears endless, matching the legacy motion (`grid3D`
z 200→2200 and `grid3D1` z -1800→200, repeating forever).

#### Scenario: Endless tunnel motion

- **WHEN** the scene is left running
- **THEN** the grids continuously move toward the camera and recycle, producing a seamless, never-ending flythrough

### Requirement: Ported shader materials render faithfully

The grid and train objects SHALL use the legacy GLSL shaders unchanged, fed the
same uniforms — distance fog, `color` set to primary cyan `#01ecf9`, and an
`alpha` uniform — so the lines render as transparent cyan wireframe with fog
falloff identical to legacy.

#### Scenario: Wireframe appearance

- **WHEN** the grids and trains render
- **THEN** they appear as transparent cyan line wireframes that fade into the black fog with distance, matching the legacy look

### Requirement: Camera matches legacy

The canvas camera SHALL use the legacy values: perspective FOV 45, near 10, far
2000, positioned at z 1000.

#### Scenario: Camera framing

- **WHEN** the scene renders
- **THEN** the framing and depth of the tunnel match the legacy camera

### Requirement: Default immersive state

The scene SHALL render in its immersive (home) state by default, with the grid
`alpha` at the legacy home value (0.1) and the train `alpha` fully visible (1.0).

#### Scenario: Initial render

- **WHEN** the scene first renders before any route transition
- **THEN** the tunnel and trains are visible in the immersive home state
