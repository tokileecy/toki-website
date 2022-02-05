import * as THREE from 'three'
import gridVertShader from '../shaders/wireframe/vert.glsl'
import gridFragShader from '../shaders/wireframe/frag.glsl'
import Color from 'color'
import { colors } from '../../baseStyles'
import TWEEN from '@tweenjs/tween.js'
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
  fog: true,
  linewidth: 1,
})

const geometry = new THREE.BoxGeometry(3000, 2500, 1000, 60, 50, 60)
const wireframeGeo = new THREE.WireframeGeometry(geometry)

const wireframe = new THREE.LineSegments(wireframeGeo, planeShaderMaterail)
wireframe.position.z = initPosition.z

export const wireframeAnimation = () => {
  new TWEEN.Tween(planeShaderMaterail.uniforms)
    .to(targetUniforms, 2000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
  new TWEEN.Tween(wireframe.position)
    .to(targetPosition, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
}

export const wireframeInvertAnimation = () => {
  new TWEEN.Tween(planeShaderMaterail.uniforms)
    .to(originUniforms, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()

  new TWEEN.Tween(wireframe.position)
    .to(originPosition, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
}

export default wireframe
