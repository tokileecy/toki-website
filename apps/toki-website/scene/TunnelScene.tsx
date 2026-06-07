'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createGrid3D } from '@/scene/createGrid3D'
import { useSceneStore } from '@/store/sceneStore'
import gridVert from '@/shaders/grid/vert.glsl'
import gridFrag from '@/shaders/grid/frag.glsl'
import wireframeVert from '@/shaders/wireframe/vert.glsl'
import wireframeFrag from '@/shaders/wireframe/frag.glsl'

const CYAN = new THREE.Color(0x01ecf9)

// Cycle durations matching legacy GSAP tweens
const GRID_CYCLE_S = 22
const TRAIN1_CYCLE_S = 5
const TRAIN_Z_CYCLE_S = 10
const TRAIN_X_CYCLE_S = 10
const TRAIN_X_DELAY_S = 2.5

function TunnelObjects() {
  const grid0Ref = useRef<THREE.LineSegments>(null)
  const grid1Ref = useRef<THREE.LineSegments>(null)
  const train1Ref = useRef<THREE.LineSegments>(null)
  const train2Ref = useRef<THREE.LineSegments>(null)
  const train3Ref = useRef<THREE.LineSegments>(null)

  // Frame-loop time accumulators
  const gridElapsed = useRef(0)
  const t1Elapsed = useRef(0)
  const t2ZElapsed = useRef(0)
  const t2XElapsed = useRef(-TRAIN_X_DELAY_S)
  const t3ZElapsed = useRef(0)
  const t3XElapsed = useRef(-TRAIN_X_DELAY_S)

  // Snap alpha uniforms on first frame instead of lerping (handles deep links)
  const alphaInitialized = useRef(false)

  // Geometry — created once, shared where legal
  const gridGeo = useMemo(() => createGrid3D(1500, 1200, 2000, 7, 9, 30), [])
  const trainGeo = useMemo(() => new THREE.BoxGeometry(50, 50, 400, 1, 1, 10), [])
  const wireframeGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(3000, 2500, 1000, 60, 50, 60)
    return new THREE.WireframeGeometry(box)
  }, [])

  // Task 2.1 — grid/train shader material: UniformsLib.fog + color cyan + lineWidth + alpha
  const gridMat = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          lineWidth: { value: 1 },
          color: { value: CYAN.clone() },
          alpha: { value: 0.1 }, // Task 2.3 — home state for grids
        },
      ]),
      vertexShader: gridVert,
      fragmentShader: gridFrag,
      transparent: true,
    })
    mat.fog = true
    return mat
  }, [])

  const trainMat = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          lineWidth: { value: 1 },
          color: { value: CYAN.clone() },
          alpha: { value: 1.0 }, // Task 2.3 — home state for trains
        },
      ]),
      vertexShader: gridVert,
      fragmentShader: gridFrag,
      transparent: true,
    })
    mat.fog = true
    return mat
  }, [])

  // Task 2.2 — wireframe material from its ported shaders
  const wireframeMat = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          color: { value: CYAN.clone() },
          pScale: { value: 0.07 },
          zScale: { value: 0.0 }, // home state: flat
          alpha: { value: 0.08 }, // home state
        },
      ]),
      vertexShader: wireframeVert,
      fragmentShader: wireframeFrag,
      transparent: true,
    })
    mat.fog = true
    return mat
  }, [])

  // Tasks 4.1 + 4.2 — useFrame loop: 22s grid cycle + leapfrog + train animations
  useFrame((_, delta) => {
    // Grid flythrough: linear 22s cycle, both grids always 2000 units apart
    gridElapsed.current = (gridElapsed.current + delta) % GRID_CYCLE_S
    const gp = gridElapsed.current / GRID_CYCLE_S
    if (grid0Ref.current) grid0Ref.current.position.z = 200 + gp * 2000
    if (grid1Ref.current) grid1Ref.current.position.z = -1800 + gp * 2000

    // Train 1: z 1500→-800 over 5s, restart
    t1Elapsed.current = (t1Elapsed.current + delta) % TRAIN1_CYCLE_S
    if (train1Ref.current) {
      const p = t1Elapsed.current / TRAIN1_CYCLE_S
      train1Ref.current.position.z = 1500 + p * (-2300) // 1500 to -800
    }

    // Train 2: z 0→1200 (10s), x -1600→4000 (10s, delayed 2.5s)
    t2ZElapsed.current = (t2ZElapsed.current + delta) % TRAIN_Z_CYCLE_S
    t2XElapsed.current += delta
    if (train2Ref.current) {
      train2Ref.current.position.z = (t2ZElapsed.current / TRAIN_Z_CYCLE_S) * 1200
      if (t2XElapsed.current > 0) {
        const px = (t2XElapsed.current % TRAIN_X_CYCLE_S) / TRAIN_X_CYCLE_S
        train2Ref.current.position.x = -1600 + px * 5600 // -1600 to 4000
      }
    }

    // Train 3: z 0→1200 (10s), x -1800→3800 (10s, delayed 2.5s)
    t3ZElapsed.current = (t3ZElapsed.current + delta) % TRAIN_Z_CYCLE_S
    t3XElapsed.current += delta
    if (train3Ref.current) {
      train3Ref.current.position.z = (t3ZElapsed.current / TRAIN_Z_CYCLE_S) * 1200
      if (t3XElapsed.current > 0) {
        const px = (t3XElapsed.current % TRAIN_X_CYCLE_S) / TRAIN_X_CYCLE_S
        train3Ref.current.position.x = -1800 + px * 5600 // -1800 to 3800
      }
    }

    // Alpha fade: lerp toward store targets each frame (lambda=8 ≈ 0.5s settle)
    // On first frame, snap directly to avoid a flash when deep-linking to /about or /work
    const { grid: gridTarget, train: trainTarget, wireframe: wireframeTarget } =
      useSceneStore.getState().targets
    if (!alphaInitialized.current) {
      gridMat.uniforms.alpha.value = gridTarget
      trainMat.uniforms.alpha.value = trainTarget
      wireframeMat.uniforms.alpha.value = wireframeTarget
      alphaInitialized.current = true
    } else {
      gridMat.uniforms.alpha.value = THREE.MathUtils.damp(gridMat.uniforms.alpha.value, gridTarget, 8, delta)
      trainMat.uniforms.alpha.value = THREE.MathUtils.damp(trainMat.uniforms.alpha.value, trainTarget, 8, delta)
      wireframeMat.uniforms.alpha.value = THREE.MathUtils.damp(wireframeMat.uniforms.alpha.value, wireframeTarget, 8, delta)
    }
  })

  return (
    <>
      {/* Task 3.2 — two grids at legacy z positions */}
      <lineSegments ref={grid0Ref} args={[gridGeo, gridMat]} position={[0, 0, 200]} />
      <lineSegments ref={grid1Ref} args={[gridGeo, gridMat]} position={[0, 0, -1800]} />

      {/* Task 3.3 — three trains */}
      <lineSegments ref={train1Ref} args={[trainGeo, trainMat]} position={[250, 0, 1500]} />
      <lineSegments
        ref={train2Ref}
        args={[trainGeo, trainMat]}
        position={[-1600, 100, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <lineSegments
        ref={train3Ref}
        args={[trainGeo, trainMat]}
        position={[-1800, -150, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Task 3.3 — wireframe object at home z=900 */}
      <lineSegments args={[wireframeGeo, wireframeMat]} position={[0, 0, 900]} />
    </>
  )
}

export default function TunnelScene() {
  return (
    <>
      {/* Task 3.1 — black fog matching legacy Fog(0x000000, 800, 1700) */}
      <fog attach="fog" args={[0x000000, 800, 1700]} />
      <TunnelObjects />
    </>
  )
}
