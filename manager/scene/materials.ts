import * as THREE from 'three'
import gridVertShader from '../shaders/grid/vert.glsl'
import gridFragShader from '../shaders/grid/frag.glsl'
import Color from 'color'
import { colors } from '@/styles/baseStyles'

export const planeShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      lineWidth: { value: 3 },
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
  linewidth: 1,
})

planeShaderMaterail.fog = true

export const gridShaderMaterail = new THREE.ShaderMaterial({
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
  linewidth: 1,
})

gridShaderMaterail.fog = true

export const trainShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      lineWidth: { value: 1 },
      alpha: {
        value: 1,
      },
      color: {
        value: new THREE.Color(new Color(colors.primaryDefault).toString()),
      },
    },
  ]),
  vertexShader: gridVertShader,
  fragmentShader: gridFragShader,
  transparent: true,
  linewidth: 1,
})

trainShaderMaterail.fog = true

export const baseGridShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      lineWidth: { value: 1 },
      alpha: {
        value: 0.3,
      },
      color: {
        value: new THREE.Color(new Color(colors.primaryDefault).toString()),
      },
    },
  ]),
  vertexShader: gridVertShader,
  fragmentShader: gridFragShader,
  transparent: true,
  linewidth: 1,
})

baseGridShaderMaterail.fog = true
