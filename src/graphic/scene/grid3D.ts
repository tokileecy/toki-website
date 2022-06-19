import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import createGrid3D from './createGrid3D'
import gridVertShader from '../shaders/grid/vert.glsl'
import gridFragShader from '../shaders/grid/frag.glsl'
import Color from 'color'
import { colors } from '../../styles/baseStyles'
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

export const grid3DAnimation = () => {
  new TWEEN.Tween(gridShaderMaterail.uniforms.alpha)
    .to({ value: 0.0 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
}

export const grid3DInvertAnimation = () => {
  new TWEEN.Tween(gridShaderMaterail.uniforms.alpha)
    .to({ value: 0.1 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
}
