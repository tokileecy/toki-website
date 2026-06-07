'use client'

import { Canvas } from '@react-three/fiber'
import TunnelScene from '@/scene/TunnelScene'

export default function SceneCanvas() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      gl={{ alpha: true }}
      camera={{ fov: 45, near: 10, far: 2000, position: [0, 0, 1000] }}
    >
      <TunnelScene />
    </Canvas>
  )
}
