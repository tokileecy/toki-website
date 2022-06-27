import gsap from 'gsap'
import createTrain from './createTrain'

// train1
export const train1 = createTrain()
train1.position.set(250, 0, 1500)

gsap
  .to(train1.position, {
    z: -800,
    duration: 5,
    ease: 'none',
  })
  .repeat(-1)

// train2
export const train2 = createTrain()
train2.position.set(-1600, 100, 0)
train2.rotation.y = Math.PI / 2

gsap
  .to(train2.position, {
    z: 1200,
    duration: 10,
    ease: 'none',
  })
  .repeat(-1)

setTimeout(() => {
  gsap
    .to(train2.position, {
      x: 4000,
      duration: 10,
      ease: 'none',
    })
    .repeat(-1)
}, 2500)

export const train3 = createTrain()
train3.position.set(-1800, -150, 0)
train3.rotation.y = Math.PI / 2

gsap
  .to(train3.position, {
    z: 1200,
    duration: 10,
    ease: 'none',
  })
  .repeat(-1)

setTimeout(() => {
  gsap
    .to(train3.position, {
      x: 3800,
      duration: 10,
      ease: 'none',
    })
    .repeat(-1)
}, 2500)
