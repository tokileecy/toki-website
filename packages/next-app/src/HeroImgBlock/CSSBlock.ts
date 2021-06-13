import * as THREE from 'three'
import { css } from '@emotion/css'
import {
  CSS3DRenderer,
  CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'

function Div1() {
  const div = document.createElement('div')
  div.textContent = " HI !  I'm tokileecy"
  const cssDiv1 = css`
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
  `
  div.classList.add(cssDiv1)
  return div
}

function Div2() {
  const div = document.createElement('div')
  div.innerHTML = 'Wellcome to... <br/> Toki`s Website!'
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
  return div
}

class CSSBlock {
  clock: THREE.Clock
  scene: THREE.Scene
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: CSS3DRenderer
  camera: THREE.PerspectiveCamera

  constructor(clock: THREE.Clock, rootElement: HTMLElement) {
    this.clock = clock
    this.rootElement = rootElement
    this.rootElementRect = rootElement.getBoundingClientRect()
    this.scene = new THREE.Scene()
    this.renderer = new CSS3DRenderer()
    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)
  }

  init(): void {
    this.renderer.domElement.classList.add(css`
      position: absolute;
      z-index: 10;
    `)

    this.camera.position.z = 3000
    this.camera.position.y = -100

    this.initObjs()
    this.resize()
  }

  resize(): void {
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    const renderWidth = this.rootElementRect.width
    const renderHeight = this.rootElementRect.height

    this.camera.fov = 40
    this.camera.aspect = renderWidth / renderHeight
    this.camera.near = 1
    this.camera.far = 10000
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(renderWidth, renderHeight)
    this.render()
  }

  render(): void {
    this.renderer.render(this.scene, this.camera)
  }

  initObjs(): void {
    const div1Obj = new CSS3DSprite(Div1())
    div1Obj.position.x = -900
    div1Obj.position.y = 600
    div1Obj.position.z = 0
    this.scene.add(div1Obj)

    const div2Obj = new CSS3DSprite(Div2())
    div2Obj.position.x = 900
    div2Obj.position.y = -600
    div2Obj.position.z = 0

    this.scene.add(div2Obj)
  }
}

export default CSSBlock
