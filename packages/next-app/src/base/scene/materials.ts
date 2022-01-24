import * as THREE from 'three'
import gridVertShader from '../shaders/grid/vert.glsl'
import gridFragShader from '../shaders/grid/frag.glsl'
import Color from 'color'

export const gridShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      lineWidth: { value: 1 },
      alpha: {
        value: 0.1,
      },
      color: { value: new THREE.Color(new Color('#02f1fa').toString()) },
    },
  ]),
  vertexShader: gridVertShader,
  fragmentShader: gridFragShader,
  transparent: true,
  fog: true,
  linewidth: 1,
})
export const trainShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      lineWidth: { value: 1 },
      alpha: {
        value: 1,
      },
      color: { value: new THREE.Color(new Color('#02f1fa').toString()) },
    },
  ]),
  vertexShader: gridVertShader,
  fragmentShader: gridFragShader,
  transparent: true,
  fog: true,
  linewidth: 1,
})
