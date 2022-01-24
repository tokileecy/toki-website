import * as THREE from 'three'
import gridVertShader from '../shaders/grid/vert.glsl'
import gridFragShader from '../shaders/grid/frag.glsl'
import Color from 'color'
import TWEEN from '@tweenjs/tween.js'
import { Vector3 } from 'three'
import createGrid3D from './createGrid3D'

const container3D = new THREE.Group()

const uniforms = THREE.UniformsUtils.merge([
  THREE.UniformsLib.fog,
  {
    alpha: {
      value: 1,
    },
    color: {
      value: new THREE.Color(new Color('#02f1fa').darken(0.5).rgb().toString()),
    },
  },
])

const containerMaterial = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: gridVertShader,
  fragmentShader: gridFragShader,
  transparent: true,
  fog: true,
  linewidth: 1,
})

// content
const contentGeo = createGrid3D(1000, 1000, 4000, 10, 10, 10, {
  hideZ: true,
})
const content = new THREE.LineSegments(contentGeo, containerMaterial)
content.scale.set(0.05, 0.05, 0.05)
container3D.add(content)

// container outline
const containerOutlineGeo1 = createGrid3D(1100, 1100, 4400, 1, 1, 1, {})
const containerOutline = new THREE.LineSegments(
  containerOutlineGeo1,
  containerMaterial
)
containerOutline.scale.set(0.05, 0.05, 0.05)
container3D.add(containerOutline)

// container animation
const originRotation = new Vector3(0.3, 0.7, 0)
const targetRotation = new Vector3(0.4, 0.8, 0)

container3D.position.set(0, 0, 700)
container3D.rotation.set(originRotation.x, originRotation.y, originRotation.z)

const duration = 2500
const easing = TWEEN.Easing.Quadratic.InOut
const startAnimate = new TWEEN.Tween(container3D.rotation)
  .to(targetRotation, duration)
  .easing(easing)
  .start()

const reverseAnimation = new TWEEN.Tween(container3D.rotation)
  .to(originRotation, duration)
  .easing(easing)

startAnimate.chain(reverseAnimation)
reverseAnimation.chain(startAnimate)
startAnimate.start()

export default container3D
