import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import createGrid3D from './createGrid3D'
import createTrain from './createTrain'
import container3D from './container3D'
import { gridShaderMaterail, baseGridShaderMaterail } from './materials'

const scene = new THREE.Scene()

// container
scene.add(container3D)

// grid

const baseGridGeo = createGrid3D(1200, 1200, 900, 3, 3, 3)
const baseGrid = new THREE.LineSegments(baseGridGeo, baseGridShaderMaterail)
baseGrid.position.set(0, 0, 400)
scene.add(baseGrid)

const contentGridGeo = createGrid3D(1200, 1200, 400, 7, 7, 10)
const contentGrid = new THREE.LineSegments(contentGridGeo, gridShaderMaterail)
contentGrid.position.set(0, 0, 200)
scene.add(contentGrid)

// train1
const train1 = createTrain()
train1.position.set(150, 0, 1500)

new TWEEN.Tween(train1.position)
  .to(new THREE.Vector3(150, 0, -800), 5000)
  .easing(TWEEN.Easing.Linear.None)
  .start()
  .repeat(Infinity)

scene.add(train1)

// train2
const train2 = createTrain()
train2.position.set(-1000, 100, 500)
train2.rotation.y = Math.PI / 2

setTimeout(() => {
  new TWEEN.Tween(train2.position)
    .to(new THREE.Vector3(1000, 100, 500), 5000)
    .easing(TWEEN.Easing.Linear.None)
    .start()
    .repeat(Infinity)
}, 2500)

scene.add(train2)

// train3
const train3 = createTrain()
train3.position.set(-1000, -200, 500)
train3.rotation.y = Math.PI / 2

setTimeout(() => {
  new TWEEN.Tween(train3.position)
    .to(new THREE.Vector3(1000, -200, 500), 5000)
    .easing(TWEEN.Easing.Linear.None)
    .start()
    .repeat(Infinity)
}, 3000)

scene.add(train3)

export default scene
