import * as THREE from 'three'
import gsap from 'gsap'
import createTrain from './createTrain'

// train1
export const train1 = createTrain()
train1.position.set(250, 0, 1500)

gsap
  .to(train1.position, {
    ...new THREE.Vector3(250, 0, -800),
    duration: 5,
    ease: 'none',
  })
  .repeat(-1)

// train2
export const train2 = createTrain()
train2.position.set(-1000, 100, 400)
train2.rotation.y = Math.PI / 2

setTimeout(() => {
  gsap
    .to(train2.position, {
      ...new THREE.Vector3(1000, 100, 400),
      duration: 5,
      ease: 'none',
    })
    .repeat(-1)
}, 2500)

export const train3 = createTrain()
train3.position.set(-1200, -150, 400)
train3.rotation.y = Math.PI / 2

setTimeout(() => {
  gsap
    .to(train3.position, {
      ...new THREE.Vector3(800, -150, 400),
      duration: 5,
      ease: 'none',
    })
    .repeat(-1)
}, 2500)
