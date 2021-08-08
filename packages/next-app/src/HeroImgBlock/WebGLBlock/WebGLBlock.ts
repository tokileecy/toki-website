import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import VERTEX from './shaders/vert.glsl'
import FRAGMENT from './shaders/frag.glsl'
import FRAGMENT_FINAL from './shaders/fragFinal.glsl'

class WebGLBlock {
  clock: THREE.Clock
  scene: THREE.Scene
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  composer: EffectComposer | null
  pass: ShaderPass | null
  passFinal: ShaderPass | null
  cameraWrap: null
  // controls: OrbitControls | null
  _devicePixelRatio: number
  requestAnimationFrameId: number | null
  composeRequestAnimationFrameId: number | null
  iState: number
  sphere: THREE.Mesh

  constructor(clock: THREE.Clock, rootElement: HTMLElement) {
    this.rootElement = rootElement
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    this._devicePixelRatio = window.devicePixelRatio || 1
    this.clock = clock
    this.iState = 0

    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)
    this.camera.position.set(0, 0, 10)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    })

    this.renderer.context.getExtension('OES_standard_derivatives')
    this.renderer.setClearColor(0xffffff, 0)

    this.scene = new THREE.Scene()

    // this.controls = new OrbitControls(this.camera, this.rootElement)

    const matNormal = new THREE.MeshNormalMaterial()
    const sphereGeo = new THREE.SphereBufferGeometry(0.5, 32, 32)
    this.sphere = new THREE.Mesh(sphereGeo, matNormal)
    this.sphere.scale.set(3, 3, 3)
    this.sphere.position.set(0, 0, 1)
    this.scene.add(this.sphere)

    this.requestAnimationFrameId = null
    this.composeRequestAnimationFrameId = null

    this.composer = null
    this.pass = null
    this.passFinal = null
    this.cameraWrap = null
  }

  init(): void {
    const ambient = new THREE.AmbientLight(0x80ffff)
    this.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffff00)
    directional.position.set(-1, 0.5, 0)
    this.scene.add(directional)

    this._initPostProcessing()
    this.resize()
  }

  stopAnimate(): void {
    this.requestAnimationFrameId !== null &&
      cancelAnimationFrame(this.requestAnimationFrameId)
  }

  resize(): void {
    this._devicePixelRatio = window.devicePixelRatio || 1
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    const renderWidth = this.rootElementRect.width
    const renderHeight = this.rootElementRect.height

    const FOV = 45
    const NEAR = 0.1
    const FAR = 1000
    const ASPECT = renderWidth / renderHeight

    this.camera.fov = FOV
    this.camera.aspect = ASPECT
    this.camera.near = NEAR
    this.camera.far = FAR
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(renderWidth, renderHeight)
    this.renderer.setPixelRatio(this._devicePixelRatio)
    this._initPostProcessing()
    this.pass?.uniforms.iResolution.value.set(renderWidth, renderHeight)

    this.render()
  }

  render(): void {
    // this.controls?.update()
    this.renderer.render(this.scene, this.camera)
  }

  animate(): void {
    this.render()
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.animate()
    })
  }

  composerRender = (): void => {
    const elapsed = this.clock.getElapsedTime()
    // if (this.iState > 1) {
    //   this.iState = 0
    // } else {
    //   this.iState += 0.08
    // }

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
        // tShadow: { type: 't', value: null },
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

export default WebGLBlock
