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
import { reaction } from 'mobx'
import heroImgState, { HeroImgState, Page } from '../HeroImgState'
import TWEEN from '@tweenjs/tween.js'

class CSSBlock {
  clock: THREE.Clock
  scene: THREE.Scene
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: CSS3DRenderer
  camera: THREE.PerspectiveCamera
  heroImgState: HeroImgState
  div1Obj: CSS3DSprite 
  div2Obj: CSS3DSprite 
  requestAnimationFrameId: number | null
  speed: number
  originDiv1Pos: THREE.Vector3
  originDiv2Pos: THREE.Vector3

  constructor(clock: THREE.Clock, rootElement: HTMLElement) {
    this.speed = 5
    this.clock = clock
    this.rootElement = rootElement
    this.rootElementRect = rootElement.getBoundingClientRect()
    this.scene = new THREE.Scene()
    this.renderer = new CSS3DRenderer()
    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)
    this.heroImgState = heroImgState
    this.div1Obj = new CSS3DSprite(document.createElement('div'))
    this.div2Obj = new CSS3DSprite(document.createElement('div'))

    this.originDiv1Pos = new THREE.Vector3(
      -900,
      600,
      0,
    )
    this.originDiv2Pos = new THREE.Vector3(
      900,
      -600,
      0,
    )
    this.requestAnimationFrameId = null

    reaction(() => this.heroImgState.page, (page: Page, prevPage: Page) => {
      if(prevPage === 'home' && page === 'about') {
        this.homeToAboutAnimation()
      } else if (prevPage === 'about' && page === 'home') {
        this.aboutToHomeAnimation()
      }
    })
  }

  init = (): void => {
    this.renderer.domElement.classList.add(css`
      position: absolute;
      z-index: 10;
    `)

    this.camera.position.z = 3000
    this.camera.position.y = -100

    this.initObjs()
    this.resize()
  }

  resize = (): void => {
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

  render = (): void => {
    this.renderer.render(this.scene, this.camera)
  }

  animate = (time?: number): void => {
    this.render()
    TWEEN.update(time)
    this.requestAnimationFrameId = requestAnimationFrame((time) => {
      this.animate(time)
    })
  }

  stopAnimate = (): void => {
    this.requestAnimationFrameId !== null &&
      cancelAnimationFrame(this.requestAnimationFrameId)
  }

  InitDiv1Obj = () => {
    return
  }

  initObjs = (): void => {
    const div1Container = document.createElement('div')
    ReactDom.render(React.createElement(Div1), div1Container)

    this.div1Obj = new CSS3DSprite(div1Container)
    this.div1Obj.position.set(this.originDiv1Pos.x,this.originDiv1Pos.y, this.originDiv1Pos.z)
    this.scene.add(this.div1Obj)

    const div2Container = document.createElement('div')
    ReactDom.render(React.createElement(Div2), div2Container)

    this.div2Obj = new CSS3DSprite(div2Container)
    this.div2Obj.position.set(this.originDiv2Pos.x,this.originDiv2Pos.y, this.originDiv2Pos.z)

    this.scene.add(this.div2Obj)
  }

  getDuration = (fromPos: THREE.Vector3, toPos: THREE.Vector3) => {
    const distance = fromPos.distanceTo(toPos)
    return (distance / this.speed)
  }

  homeToAboutAnimation = () => {
    const div1CurrentPos = this.div1Obj.position.clone()
    const div1DestinationPos = div1CurrentPos.clone()
    div1DestinationPos.x = -5000
    const div1Duration = this.getDuration(div1CurrentPos, div1DestinationPos)

    new TWEEN.Tween(this.div1Obj.position)
      .to(div1DestinationPos, div1Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    const div2CurrentPos = this.div2Obj.position.clone()
    const div2DestinationPos = div2CurrentPos.clone()
    div2DestinationPos.x = 5000
    const div2Duration = this.getDuration(div2CurrentPos, div2DestinationPos)

    new TWEEN.Tween(this.div2Obj.position)
      .to(div2DestinationPos, div2Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }

  aboutToHomeAnimation = () => {
    const div1CurrentPos = this.div1Obj.position.clone()
    const div1DestinationPos = this.originDiv1Pos.clone()
    const div1Duration = this.getDuration(div1CurrentPos, div1DestinationPos)

    new TWEEN.Tween(this.div1Obj.position)
      .to(div1DestinationPos, div1Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    const div2CurrentPos = this.div2Obj.position.clone()
    const div2DestinationPos = this.originDiv2Pos.clone()

    const div2Duration = this.getDuration(div2CurrentPos, div2DestinationPos)

    new TWEEN.Tween(this.div2Obj.position)
      .to(div2DestinationPos, div2Duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
}

export default CSSBlock
