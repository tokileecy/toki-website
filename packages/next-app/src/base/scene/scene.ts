import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import createGrid3D from './createGrid3D'
import createTrain, {
  trainAnimation,
  trainInvertAnimation,
} from './createTrain'
import container3D from './container3D'
import { gridShaderMaterail, baseGridShaderMaterail } from './materials'
import wireframe3D, {
  wireframeAnimation,
  wireframeInvertAnimation,
} from './wireframe3D'
import { train1, train2, train3 } from './trains'
import { grid3D, grid3DAnimation, grid3DInvertAnimation } from './grid3D'
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0x000000, 800, 1700)

scene.add(wireframe3D)

// container
// scene.add(container3D)

// // grid

// const baseGridGeo = createGrid3D(1200, 1200, 900, 3, 3, 3)
// const baseGrid = new THREE.LineSegments(baseGridGeo, baseGridShaderMaterail)
// baseGrid.position.set(0, 0, 400)
// scene.add(baseGrid)

scene.add(grid3D)

// trains
scene.add(train1)
scene.add(train2)
scene.add(train3)

export const animation = () => {
  trainAnimation()
  wireframeAnimation()
  grid3DAnimation()
}

export const invertAnimation = () => {
  trainInvertAnimation()
  wireframeInvertAnimation()
  grid3DInvertAnimation()
}

if (typeof window !== 'undefined') {
  window.a5 = animation
  window.a6 = invertAnimation
}
export default scene
