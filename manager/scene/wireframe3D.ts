import * as THREE from 'three'
import gridVertShader from '../shaders/wireframe/vert.glsl'
import gridFragShader from '../shaders/wireframe/frag.glsl'
import Color from 'color'
import { colors } from '@/styles/baseStyles'
import gsap from 'gsap'
import { getInitPage } from './utils'

const initPage = getInitPage()

const originUniforms = {
  zScale: { value: 0.0 },
  alpha: {
    value: 0.08,
  },
}

const targetUniforms = {
  zScale: { value: 1.0 },
  alpha: {
    value: 0.3,
  },
}

const originPosition = { z: 900 }
const targetPosition = { z: 500 }

const initUniforms = JSON.parse(
  JSON.stringify(initPage === 'home' ? originUniforms : targetUniforms)
)

const initPosition = initPage === 'home' ? originPosition : targetPosition

export const planeShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      color: {
        value: new THREE.Color(new Color(colors.primaryDefault).toString()),
      },
      pScale: { value: 0.07 },
    },
    initUniforms,
  ]),
  vertexShader: gridVertShader,
  fragmentShader: gridFragShader,
  transparent: true,
  linewidth: 1,
})

planeShaderMaterail.fog = true

const geometry = new THREE.BoxGeometry(3000, 2500, 1000, 60, 50, 60)
const wireframeGeo = new THREE.WireframeGeometry(geometry)

const wireframe = new THREE.LineSegments(wireframeGeo, planeShaderMaterail)
wireframe.position.z = initPosition.z

export const wireframeAnimation = async () => {
  const scalePromise = new Promise((resolve) => {
    gsap
      .to(planeShaderMaterail.uniforms.zScale, {
        ...targetUniforms.zScale,
        duration: 2,
        ease: 'power2.inOut',
      })
      .play()
      .then(() => {
        resolve(null)
      })
  })

  const alphaPromise = new Promise((resolve) => {
    gsap
      .to(planeShaderMaterail.uniforms.alpha, {
        ...targetUniforms.alpha,
        duration: 2,
        ease: 'power2.inOut',
      })
      .play()
      .then(() => {
        resolve(null)
      })
  })
  const posPromise = new Promise((resolve) => {
    gsap
      .to(wireframe.position, {
        ...targetPosition,
        duration: 1,
        ease: 'power2.inOut',
      })
      .play()
      .then(() => {
        resolve(null)
      })
  })

  await Promise.all([scalePromise, alphaPromise, posPromise])
}

export const wireframeInvertAnimation = async () => {
  const scalePromise = new Promise((resolve) => {
    gsap
      .to(planeShaderMaterail.uniforms.zScale, {
        ...originUniforms.zScale,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .play()
      .then(() => {
        resolve(null)
      })
  })
  const alphaPromise = new Promise((resolve) => {
    gsap
      .to(planeShaderMaterail.uniforms.alpha, {
        ...originUniforms.alpha,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .play()
      .then(() => {
        resolve(null)
      })
  })
  const posPromise = new Promise((resolve) => {
    gsap
      .to(wireframe.position, {
        ...originPosition,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .play()
      .then(() => {
        resolve(null)
      })
  })

  await Promise.all([scalePromise, alphaPromise, posPromise])
}

export default wireframe
