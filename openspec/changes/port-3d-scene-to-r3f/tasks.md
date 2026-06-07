## 1. Port assets from legacy

- [ ] 1.1 Copy the GLSL shaders (`grid`, `gridPoint`, `wireframe`) into the new app verbatim
- [ ] 1.2 Port `createGrid3D` and `createTrain` geometry helpers
- [ ] 1.3 Port `trains.ts` placement/animation and the `wireframe3D` setup

## 2. Materials

- [ ] 2.1 Build the grid/train shader material (merge `UniformsLib.fog` + `color` cyan + `lineWidth` + `alpha`), `transparent: true`, `fog: true`
- [ ] 2.2 Build the wireframe material from its ported shaders
- [ ] 2.3 Initialize `alpha` uniforms to the home state (grid 0.1, train 1.0)

## 3. Scene graph in R3F

- [ ] 3.1 Add `<fog>` (`0x000000`, 800, 1700) to the canvas scene
- [ ] 3.2 Mount the two grids at the legacy positions (z 200 and z -1800)
- [ ] 3.3 Mount the three trains and the wireframe object
- [ ] 3.4 Confirm the canvas camera is FOV 45 / near 10 / far 2000 / z 1000 (from the shell)

## 4. Flythrough motion

- [ ] 4.1 Implement the `useFrame` loop translating grid z on a ~22s linear cycle
- [ ] 4.2 Leapfrog the two grids so the tunnel is seamless and endless

## 5. Verify against legacy

- [ ] 5.1 Side-by-side compare the immersive home state with the legacy site (framing, color, fog falloff, motion speed)
- [ ] 5.2 Confirm no `@psycholog-studio/ui` ThreeManager/LayerController is used and no CSS3D renderer exists
