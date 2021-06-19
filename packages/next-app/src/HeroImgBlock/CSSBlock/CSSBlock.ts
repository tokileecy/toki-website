import React from 'react'
import ReactDom from 'react-dom'
import * as THREE from 'three'
import { css } from '@emotion/css'
import {
  CSS3DRenderer,
  CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import Div1 from './Div1'
import Div2 from './Div2'

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
    const div1Container = document.createElement('div')
    ReactDom.render(React.createElement(Div1), div1Container)

    const div1Obj = new CSS3DSprite(div1Container)
    div1Obj.position.x = -900
    div1Obj.position.y = 600
    div1Obj.position.z = 0
    this.scene.add(div1Obj)

    const div2Container = document.createElement('div')
    ReactDom.render(React.createElement(Div2), div2Container)

    const div2Obj = new CSS3DSprite(div2Container)
    div2Obj.position.x = 900
    div2Obj.position.y = -600
    div2Obj.position.z = 0

    this.scene.add(div2Obj)
  }
}

export default CSSBlock
