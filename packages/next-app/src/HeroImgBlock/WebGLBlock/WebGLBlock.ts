import * as THREE from 'three'
import heroImgState from '../HeroImgState'

class WebGLBlock {
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: THREE.WebGLRenderer
  cameraWrap: null
  _devicePixelRatio: number
  requestAnimationFrameId: number | null
  iState: number

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    this._devicePixelRatio = window.devicePixelRatio || 1

    this.iState = 0

    heroImgState.scene.fog = new THREE.Fog(0x000000, 50, 3000)

    const geometry = new THREE.BoxGeometry(1000, 1000, 1000, 50, 50, 50)

    const wireframe = new THREE.WireframeGeometry(geometry)

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1,
      linecap: 'round',
      linejoin: 'round',
    })

    const line = new THREE.LineSegments(wireframe, material)
    line.material.depthTest = false
    line.material.opacity = 0.25
    line.material.transparent = true

    heroImgState.scene.add(line)

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
    this.renderer.extensions.get('EXT_color_buffer_float')
    this.renderer.setClearColor(0xffffff, 0)

    this.requestAnimationFrameId = null

    this.cameraWrap = null
  }

  init = (): void => {
    const ambient = new THREE.AmbientLight(0x80ffff)
    heroImgState.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffff00)
    directional.position.set(-1, 0.5, 0)
    heroImgState.scene.add(directional)

    this.resize()
  }

  resize = (): void => {
    this._devicePixelRatio = window.devicePixelRatio || 1
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    const renderWidth = this.rootElementRect.width
    const renderHeight = this.rootElementRect.height

    const FOV = 45
    const NEAR = 500
    const FAR = 1000
    const ASPECT = renderWidth / renderHeight

    heroImgState.camera.fov = FOV
    heroImgState.camera.aspect = ASPECT
    heroImgState.camera.near = NEAR
    heroImgState.camera.far = FAR
    heroImgState.camera.updateProjectionMatrix()

    this.renderer.setSize(renderWidth, renderHeight)
    this.renderer.setPixelRatio(this._devicePixelRatio)

    this.render()
  }

  render = (): void => {
    this.renderer.render(heroImgState.scene, heroImgState.camera)
  }

  animate = (): void => {
    this.render()
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.animate()
    })
  }

  stopAnimate(): void {
    this.requestAnimationFrameId !== null &&
      cancelAnimationFrame(this.requestAnimationFrameId)
  }
}

export default WebGLBlock
