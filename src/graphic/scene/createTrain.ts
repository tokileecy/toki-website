import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import gridVertShader from '../shaders/grid/vert.glsl'
import gridFragShader from '../shaders/grid/frag.glsl'
import Color from 'color'
import { colors } from '../../styles/baseStyles'
import { getInitPage } from './utils'

const originUniforms = {
  alpha: {
    value: 1.0,
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

const trainShaderMaterail = new THREE.ShaderMaterial({
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

trainShaderMaterail.fog = true

const createTrain = () => {
  const cubeGeo = new THREE.BoxGeometry(50, 50, 400, 1, 1, 10)

  const cube = new THREE.LineSegments(cubeGeo, trainShaderMaterail)
  return cube
}

export const trainAnimation = () => {
  new TWEEN.Tween(trainShaderMaterail.uniforms.alpha)
    .to({ value: 0.0 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
}

export const trainInvertAnimation = () => {
  new TWEEN.Tween(trainShaderMaterail.uniforms.alpha)
    .to({ value: 1.0 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
}

export default createTrain
