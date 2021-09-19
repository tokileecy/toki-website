import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import VERTEX from './shaders/postProcess/borderNoise/vert.glsl'
import FRAGMENT from './shaders/postProcess/borderNoise/frag.glsl'
import FRAGMENT_FINAL from './shaders/postProcess/borderNoise/fragFinal.glsl'

import BaseWebGLBlock from '../BaseWebGLBlock'

export type SpriteWebGLBlockOptions = {
  clock?: THREE.Clock
}
class SpriteWebGLBlock extends BaseWebGLBlock {
  resizeObserver: ResizeObserver
  sphere: THREE.Mesh

  composer: EffectComposer | null
  pass: ShaderPass | null
  passFinal: ShaderPass | null
  composeRequestAnimationFrameId: number | null
  iState: number

  constructor(rootElement: HTMLElement, options?: SpriteWebGLBlockOptions) {
    super(options?.clock ?? new THREE.Clock(), rootElement)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    const context = this.renderer.getContext()
    if (context !== null && context !== undefined) {
      context.getExtension('OES_standard_derivatives')
    }
    this.renderer.setClearColor(0x000000, 0)
    this.iState = 0
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          this.resize()
        }
      }
    })

    const matNormal = new THREE.MeshNormalMaterial()
    const sphereGeo = new THREE.SphereBufferGeometry(0.5, 32, 32)
    this.sphere = new THREE.Mesh(sphereGeo, matNormal)
    this.sphere.scale.set(3, 3, 3)
    this.sphere.position.set(0, 0, 5)
    this.scene.add(this.sphere)

    this.composeRequestAnimationFrameId = null

    this.iState = 0
    this.composer = null
    this.pass = null
    this.passFinal = null
  }

  init = (): void => {
    super.init()
    this.resizeObserver.observe(this.rootElement)
    this.rootElement.appendChild(this.renderer.domElement)

    const ambient = new THREE.AmbientLight(0x80ffff)
    this.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffff00)
    directional.position.set(-1, 0.5, 0)
    this.scene.add(directional)

    this._initPostProcessing()
    this.resize()
  }

  clear = (): void => {
    this.stopAnimate()
    this.rootElement.removeChild(this.renderer.domElement)
    this.resizeObserver.unobserve(this.rootElement)
  }

  composerRender = (): void => {
    const elapsed = this.clock.getElapsedTime()
    // if (this.iState > 1) {
    //   this.iState = 0
    // } else {
    //   this.iState += 0.08
    // }

    // console.log('???')
    this.passFinal && (this.passFinal.uniforms.iTime.value = elapsed)
    this.passFinal && (this.passFinal.uniforms.iState.value = this.iState)
    this.composer?.render()
  }

  composerAnimate = (): void => {
    this.composerRender()
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.composerAnimate()
    })
  }

  _initPostProcessing(): void {
    const width = this.rootElementRect.width
    const height = this.rootElementRect.height

    const resolution = new THREE.Vector2(width, height)

    const drawShader = {
      uniforms: {
        tDiffuse: { type: 't', value: null },
        iResolution: { type: 'v2', value: resolution },
      },
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    }

    const finalShader = {
      uniforms: {
        tDiffuse: { type: 't', value: null },
        iTime: { type: 'f', value: 0.0 },
        iState: { type: 'f', value: 0.0 },
        tNoise: { type: 't', value: new THREE.TextureLoader() },
      },
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT_FINAL,
    }

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.pass = new ShaderPass(drawShader)
    this.pass.renderToScreen = true
    this.composer.addPass(this.pass)

    this.passFinal = new ShaderPass(finalShader)
    this.passFinal.renderToScreen = true
    this.composer.addPass(this.passFinal)
  }
}

export default SpriteWebGLBlock
