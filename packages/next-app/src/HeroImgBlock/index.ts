import * as THREE from 'three'
import { css, injectGlobal } from '@emotion/css'
import {
  CSS3DRenderer,
  CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class HomeImgBlock {
  rootElementRect: DOMRect
  clock: THREE.Clock
  rootElement: HTMLElement
  renderer: THREE.WebGLRenderer
  cssRenderer: CSS3DRenderer
  camera: THREE.PerspectiveCamera
  cssCamera: THREE.PerspectiveCamera
  scene: THREE.Scene
  controls: OrbitControls | null
  _devicePixelRatio: number
  _cameraFar: number
  requestAnimationFrameId: number | null
  isRotating: boolean

  constructor(graphRoot: { current: HTMLElement | null }) {
    if (graphRoot.current !== null) {
      this.rootElement = graphRoot.current
    } else {
      this.rootElement = document.createElement('div')
      console.warn(`graphRoot.current should not be ${graphRoot.current}`)
    }

    this.rootElementRect = this.rootElement.getBoundingClientRect()

    this.clock = new THREE.Clock()
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    this.cssRenderer = new CSS3DRenderer()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)
    this.cssCamera = new THREE.PerspectiveCamera(0, 0, 0, 0)
    this.controls = null
    this._devicePixelRatio = window.devicePixelRatio || 1
    this._cameraFar = 2000

    this.requestAnimationFrameId = null
    this.init = this.init.bind(this)
    this.clear = this.clear.bind(this)
    this.isRotating = false
  }

  async init(): Promise<void> {
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
    this.camera.position.set(0, 0, 10)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    this.cssCamera.fov = 40
    this.cssCamera.aspect = renderWidth / renderHeight
    this.cssCamera.near = 1
    this.cssCamera.far = 10000
    this.cssCamera.updateProjectionMatrix()

    this.cssCamera.position.z = 3000
    this.cssCamera.position.y = -100

    const ambient = new THREE.AmbientLight(0x80ffff)
    this.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffff00)
    directional.position.set(-1, 0.5, 0)
    this.scene.add(directional)

    this.renderer.setPixelRatio(this._devicePixelRatio * 2)
    this.renderer.setClearColor(0xffffff, 0)

    this.cssRenderer.domElement.classList.add(css`
      position: absolute;
      z-index: 10;
    `)
    this.rootElement.appendChild(this.cssRenderer.domElement)

    this.rootElement.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.rootElement)

    this.render3D()
    this.renderCSS()
    this.resize()
    this._animate()
    window.addEventListener('resize', () => {
      this.resize()
    })
  }

  async clear(): Promise<void> {
    this.rootElement.removeChild(this.renderer.domElement)
    this.rootElement.removeChild(this.cssRenderer.domElement)
    window.removeEventListener('resize', () => {
      this.resize()
    })
    this.requestAnimationFrameId !== null &&
      cancelAnimationFrame(this.requestAnimationFrameId)
  }

  render3D(): void {
    const matNormal = new THREE.MeshNormalMaterial()
    const sphereGeo = new THREE.SphereBufferGeometry(0.5, 32, 32)
    const sphere = new THREE.Mesh(sphereGeo, matNormal)
    sphere.scale.set(3, 3, 3)
    sphere.position.set(0, 0, 1)
    this.scene.add(sphere)
  }

  renderCSS(): void {
    const div = document.createElement('div')
    div.textContent = " HI !  I'm tokileecy"
    div.classList.add(css`
      /* top: 10px;
      right: 10px; */
      display: flex;
      align-items: center;
      justify-content: center;
      width: 750px;
      height: 500px;
      background-color: rgba(1, 1, 1, 0.25);
      border: white 2px solid;
      font-size: 60px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.75);
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
    `)
    const object = new CSS3DSprite(div)
    object.position.x = -900
    object.position.y = 600
    object.position.z = 0
    this.scene.add(object)

    const div1 = document.createElement('div')
    div1.innerHTML = 'Wellcome to... <br/> Toki`s Website!'
    div1.classList.add(css`
      /* top: 10px;
      right: 10px; */
      display: flex;
      align-items: center;
      justify-content: center;
      width: 750px;
      height: 500px;
      background-color: rgba(1, 1, 1, 0.25);
      border: white 2px solid;
      font-size: 60px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.75);
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
    `)
    const div1Obj = new CSS3DSprite(div1)
    div1Obj.position.x = 900
    div1Obj.position.y = -600
    div1Obj.position.z = 0

    this.scene.add(div1Obj)
  }

  resize(): void {
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    const renderWidth = this.rootElementRect.width
    const renderHeight = this.rootElementRect.height

    this.renderer.setSize(renderWidth, renderHeight)
    this.cssRenderer.setSize(renderWidth, renderHeight)
  }

  _animate(): void {
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this._animate()
    })

    this.controls?.update()
    this.renderer.render(this.scene, this.camera)
    this.cssRenderer.render(this.scene, this.cssCamera)
  }
}

export default HomeImgBlock
