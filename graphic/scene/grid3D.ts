import * as THREE from 'three'
import gsap from 'gsap'
import createGrid3D from './createGrid3D'
import gridVertShader from '../shaders/grid/vert.glsl'
import gridFragShader from '../shaders/grid/frag.glsl'
import Color from 'color'
import { colors } from '@/styles/baseStyles'
import { getInitPage } from './utils'

const originUniforms = {
  alpha: {
    value: 0.1,
  },
}

const targetUniforms = {
  alpha: {
    value: 0.0,
  },
}

const initPage = getInitPage()

const initUniforms = JSON.parse(
  JSON.stringify(initPage === 'home' ? originUniforms : targetUniforms)
)

const gridShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      lineWidth: { value: 1 },
      color: {
        value: new THREE.Color(new Color(colors.primaryDefault).toString()),
      },
    },
    initUniforms,
  ]),
  vertexShader: gridVertShader,
  fragmentShader: gridFragShader,
  transparent: true,
  linewidth: 1,
})

gridShaderMaterail.fog = true

const grid3DGeo = createGrid3D(1500, 1200, 2000, 7, 9, 30)
export const grid3D = new THREE.LineSegments(grid3DGeo, gridShaderMaterail)
grid3D.position.set(0, 0, 200)

export const grid3D1 = new THREE.LineSegments(grid3DGeo, gridShaderMaterail)
grid3D1.position.set(0, 0, -1800)

gsap
  .to(grid3D.position, {
    z: 2200,
    duration: 22,
    ease: 'none',
  })
  .repeat(-1)
gsap
  .to(grid3D1.position, {
    z: 200,
    duration: 22,
    ease: 'none',
  })
  .repeat(-1)

export const grid3DAnimation = () => {
  gsap
    .to(gridShaderMaterail.uniforms.alpha, {
      value: 0.0,
      duration: 0.5,
      ease: 'power2.inOut',
    })
    .play()
}

export const grid3DInvertAnimation = () => {
  gsap
    .to(gridShaderMaterail.uniforms.alpha, {
      value: 0.1,
      duration: 0.5,
      ease: 'power2.inOut',
    })
    .play()
}
