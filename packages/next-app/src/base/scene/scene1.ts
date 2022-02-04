import * as THREE from 'three'
import container3D from './container3D'
import { gridShaderMaterail, baseGridShaderMaterail } from './materials'
import wireframe3D from './wireframe3D'

const scene = new THREE.Scene()

// container
// scene.add(container3D)

// wireframe3D
scene.add(wireframe3D)

export default scene
