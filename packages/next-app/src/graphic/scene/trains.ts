import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import createTrain from './createTrain'

// train1
export const train1 = createTrain()
train1.position.set(250, 0, 1500)

new TWEEN.Tween(train1.position)
  .to(new THREE.Vector3(250, 0, -800), 5000)
  .easing(TWEEN.Easing.Linear.None)
  .start()
  .repeat(Infinity)

// train2
export const train2 = createTrain()
train2.position.set(-1000, 100, 400)
train2.rotation.y = Math.PI / 2

setTimeout(() => {
  new TWEEN.Tween(train2.position)
    .to(new THREE.Vector3(1000, 100, 400), 5000)
    .easing(TWEEN.Easing.Linear.None)
    .start()
    .repeat(Infinity)
}, 2500)

export const train3 = createTrain()
train3.position.set(-1200, -150, 400)
train3.rotation.y = Math.PI / 2

setTimeout(() => {
  new TWEEN.Tween(train3.position)
    .to(new THREE.Vector3(800, -150, 400), 5000)
    .easing(TWEEN.Easing.Linear.None)
    .start()
    .repeat(Infinity)
}, 2500)
