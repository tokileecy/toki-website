import * as THREE from 'three'
import { css } from '@emotion/css'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import { reaction } from 'mobx'
import heroImgState, { HeroImgState, Page } from '../HeroImgState'
import TWEEN from '@tweenjs/tween.js'
import PageLayer from './PageLayer'
import HomeLayer from './HomeLayer'
import AboutLayer from './AboutLayer'
import ContactLayer from './ContactLayer'
import WorkLayer from './WorkLayer'

export type PageLayerName = Page

class CSSBlock {
  rootElement: HTMLElement
  rootElementRect: DOMRect
  renderer: CSS3DRenderer
  heroImgState: HeroImgState
  pageLayers: {
    [key in PageLayerName]?: PageLayer
  }

  requestAnimationFrameId: number | null

  group: THREE.Group
  _devicePixelRatio: number

  constructor(rootElement: HTMLElement) {
    this.group = new THREE.Group()
    this.pageLayers = {
      home: new HomeLayer(this.group),
      about: new AboutLayer(this.group),
      contact: new ContactLayer(this.group),
      work: new WorkLayer(this.group),
    }
    this.rootElement = rootElement
    this.rootElementRect = rootElement.getBoundingClientRect()

    this._devicePixelRatio = window.devicePixelRatio ?? 1
    heroImgState.scene.add(this.group)
    this.renderer = new CSS3DRenderer()

    this.renderer.domElement.classList.add(css`
      position: absolute;
      z-index: 30;
      pointer-events: none;
    `)

    this.heroImgState = heroImgState
    this.requestAnimationFrameId = null

    reaction(
      () => this.heroImgState.page,
      (page: Page, prevPage: Page) => {
        this.animate()
        const onAnimationComplete = () => {
          this.stopAnimate()
        }
        if (prevPage === 'home' && page !== 'home') {
          this.pageLayers.home?.outAnimation?.(onAnimationComplete)
        } else if (prevPage === 'about' && page !== 'about') {
          this.pageLayers.about?.outAnimation?.(onAnimationComplete)
        } else if (prevPage === 'work' && page !== 'work') {
          this.pageLayers.work?.outAnimation?.(onAnimationComplete)
        } else if (prevPage === 'contact' && page !== 'contact') {
          this.pageLayers.contact?.outAnimation?.(onAnimationComplete)
        }

        if (prevPage !== 'home' && page === 'home') {
          this.pageLayers.home?.inAnimation?.(onAnimationComplete)
        } else if (prevPage !== 'about' && page === 'about') {
          this.pageLayers.about?.inAnimation?.(onAnimationComplete)
        } else if (prevPage !== 'work' && page === 'work') {
          this.pageLayers.work?.inAnimation?.(onAnimationComplete)
        } else if (prevPage !== 'contact' && page === 'contact') {
          this.pageLayers.contact?.inAnimation?.(onAnimationComplete)
        }
      }
    )
  }

  init = (): void => {
    this.pageLayers.home?.init?.(this.heroImgState.page === 'home')
    this.pageLayers.about?.init?.(this.heroImgState.page === 'about')
    this.pageLayers.contact?.init?.(this.heroImgState.page === 'contact')
    this.pageLayers.work?.init?.(this.heroImgState.page === 'work')
    this.resize()
  }

  resize = (): void => {
    this.rootElementRect = this.rootElement.getBoundingClientRect()
    const renderWidth = this.rootElementRect.width
    const renderHeight = this.rootElementRect.height

    this.renderer.setSize(renderWidth, renderHeight)
    this.render()
  }

  render = (): void => {
    this.renderer.render(heroImgState.scene, heroImgState.camera)
  }

  animate = (time?: number): void => {
    this.render()
    // TWEEN.update(time)

    if (this.requestAnimationFrameId !== null) {
      this.stopAnimate()
    }
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
