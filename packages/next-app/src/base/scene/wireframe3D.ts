import * as THREE from 'three'
import gridVertShader from '../shaders/wireframe/vert.glsl'
import gridFragShader from '../shaders/wireframe/frag.glsl'
import Color from 'color'
import { colors } from '../../baseStyles'
import TWEEN from '@tweenjs/tween.js'

export const planeShaderMaterail = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      zScale: { value: 0.0 },
      pScale: { value: 0.07 },
      alpha: {
        value: 0.25,
      },
      color: {
        // value: new THREE.Color(new Color(0xffffff).darken(0.1).toString()),
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

const geometry = new THREE.BoxGeometry(3000, 2500, 1000, 60, 50, 60)
const wireframeGeo = new THREE.WireframeGeometry(geometry)

const wireframe = new THREE.LineSegments(wireframeGeo, planeShaderMaterail)
wireframe.position.z = 900
// line.material.depthTest = false
// line.material.opacity = 0.2
// line.material.transparent = true

export const animation = () => {
  new TWEEN.Tween(planeShaderMaterail.uniforms.zScale)
    .to({ value: 1.0 }, 2000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
  new TWEEN.Tween(wireframe.position)
    .to({ z: 500 }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
}

export const invertAnimation = () => {
  new TWEEN.Tween(planeShaderMaterail.uniforms.zScale)
    .to({ value: 0.0 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
  new TWEEN.Tween(wireframe.position)
    .to({ z: 900 }, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
}

window.a1 = animation
window.a2 = invertAnimation

export default wireframe
