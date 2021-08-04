import React, { createRef } from 'react'
import ReactDom from 'react-dom'
import * as THREE from 'three'
import { css } from '@emotion/css'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import { reaction } from 'mobx'
import heroImgState, { HeroImgState, Page } from '../HeroImgState'
import TWEEN from '@tweenjs/tween.js'
import PageLayer from './PageLayer'
import HomeLayer from './HomeLayer'
import AboutLayer from './AboutLayer'

export type PageLayerName = 'home' | 'about'

class CSSBlock {
  clock: THREE.Clock
  scene: THREE.Scene
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: CSS3DRenderer
  camera: THREE.PerspectiveCamera
  heroImgState: HeroImgState
  pageLayers: {
    [key in PageLayerName]?: PageLayer
  }

  requestAnimationFrameId: number | null

  group: THREE.Group
  _devicePixelRatio: number

  constructor(clock: THREE.Clock, rootElement: HTMLElement) {
    this.clock = clock
    this.group = new THREE.Group()
    this.pageLayers = {
      home: new HomeLayer(this.group),
      about: new AboutLayer(this.group),
    }
    this.rootElement = rootElement
    this.rootElementRect = rootElement.getBoundingClientRect()
    this.scene = new THREE.Scene()

    this._devicePixelRatio = window.devicePixelRatio ?? 1
    this.scene.add(this.group)
    this.renderer = new CSS3DRenderer()
    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)
    this.heroImgState = heroImgState
    this.requestAnimationFrameId = null

    reaction(
      () => this.heroImgState.page,
      (page: Page, prevPage: Page) => {
        if (prevPage === 'home' && page === 'about') {
          this.pageLayers.home?.outAnimation?.()
          this.pageLayers.about?.inAnimation?.()
        } else if (prevPage === 'about' && page === 'home') {
          this.pageLayers.home?.inAnimation?.()
        }
      }
    )
  }

  init = (): void => {
    this.renderer.domElement.classList.add(css`
      position: absolute;
      z-index: 10;
    `)

    this.camera.position.z = 3000
    this.camera.position.y = -100

    this.pageLayers.home?.init?.()
    this.pageLayers.about?.init?.()
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
}

export default CSSBlock
