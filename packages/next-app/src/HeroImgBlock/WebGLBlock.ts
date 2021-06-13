import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class WebGLBlock {
  clock: THREE.Clock
  scene: THREE.Scene
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  cameraWrap: null
  controls: OrbitControls | null
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
    this.renderer.setClearColor(0xffffff, 0)

    this.scene = new THREE.Scene()

    this.controls = new OrbitControls(this.camera, this.rootElement)

    this.requestAnimationFrameId = null
    this.cameraWrap = null
  }

  init(): void {
    const ambient = new THREE.AmbientLight(0x80ffff)
    this.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffff00)
    directional.position.set(-1, 0.5, 0)
    this.scene.add(directional)

    this._initObjs()
    this.resize()
  }

  animate(): void {
    this.render()
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.animate()
    })
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
    this.controls?.update()
    this.renderer.render(this.scene, this.camera)
  }

  _initObjs(): void {
    const matNormal = new THREE.MeshNormalMaterial()
    const sphereGeo = new THREE.SphereBufferGeometry(0.5, 32, 32)
    const sphere = new THREE.Mesh(sphereGeo, matNormal)
    sphere.scale.set(3, 3, 3)
    sphere.position.set(0, 0, 1)
    this.scene.add(sphere)
  }
}

export default WebGLBlock
