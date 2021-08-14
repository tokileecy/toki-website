import * as THREE from 'three'

class BaseWebGLBlock {
  clock: THREE.Clock
  scene: THREE.Scene
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  cameraWrap: null
  _devicePixelRatio: number
  requestAnimationFrameId: number | null

  constructor(clock: THREE.Clock, rootElement: HTMLElement) {
    this.rootElement = rootElement
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    this._devicePixelRatio = window.devicePixelRatio || 1
    this.clock = clock

    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)
    this.camera.position.set(0, 0, 10)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    })

    this.renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault()
    })

    const context = this.renderer.getContext()
    if (context !== null && context !== undefined) {
      context.getExtension('OES_standard_derivatives')
    }

    this.renderer.setClearColor(0xffffff, 0)

    this.scene = new THREE.Scene()

    this.requestAnimationFrameId = null

    this.cameraWrap = null
  }

  init(): void {
    const ambient = new THREE.AmbientLight(0x80ffff)
    this.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffff00)
    directional.position.set(-1, 0.5, 0)
    this.scene.add(directional)

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

    this.render()
  }

  render(): void {
    this.renderer.render(this.scene, this.camera)
  }

  animate(): void {
    this.render()
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.animate()
    })
  }
}

export default BaseWebGLBlock
