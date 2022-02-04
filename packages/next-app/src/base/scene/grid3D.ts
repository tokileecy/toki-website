import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import createGrid3D from './createGrid3D'

import gridVertShader from '../shaders/grid/vert.glsl'
import gridFragShader from '../shaders/grid/frag.glsl'
import Color from 'color'
import { colors } from '../../baseStyles'

const gridShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      lineWidth: { value: 1 },
      alpha: {
        value: 0.1,
      },
      color: {
        value: new THREE.Color(new Color(colors.primaryDefault).toString()),
      },
    },
  ]),
  vertexShader: gridVertShader,
  fragmentShader: gridFragShader,
  transparent: true,
  fog: true,
  linewidth: 1,
})

const grid3DGeo = createGrid3D(1500, 1200, 2000, 7, 9, 30)
export const grid3D = new THREE.LineSegments(grid3DGeo, gridShaderMaterail)
grid3D.position.set(0, 0, 200)

export const grid3DAnimation = () => {
  new TWEEN.Tween(gridShaderMaterail.uniforms.alpha)
    .to({ value: 0.0 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
  // new TWEEN.Tween(wireframe.position)
  //   .to({ z: 500 }, 1000)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .start()
}

export const grid3DInvertAnimation = () => {
  new TWEEN.Tween(gridShaderMaterail.uniforms.alpha)
    .to({ value: 0.1 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
  // new TWEEN.Tween(wireframe.position)
  //   .to({ z: 900 }, 500)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .start()
}

if (typeof window !== 'undefined') {
  window.a3 = grid3DAnimation
  window.a4 = grid3DInvertAnimation
}
