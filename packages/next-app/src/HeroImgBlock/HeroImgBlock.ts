import * as THREE from 'three'
import CSSBlock from './CSSBlock'
import WebGLBlock from './WebGLBlock'
import heroImgState, { Page } from './HeroImgState'
import TWEEN from '@tweenjs/tween.js'
import { getDuration } from './utils'

type GraphRootElementRef = { current: HTMLElement | null }

class HomeImgBlock {
  heroImgState
  resizeObserver: ResizeObserver
  rootElement: HTMLElement
  webGlBlock: WebGLBlock
  cssBlock: CSSBlock

  constructor(graphRoot: GraphRootElementRef) {
    if (graphRoot.current !== null) {
      this.rootElement = graphRoot.current
    } else {
      this.rootElement = document.createElement('div')
      console.warn(`graphRoot.current should not be ${graphRoot.current}`)
    }

    this.heroImgState = heroImgState
    this.heroImgState.camera.position.z = 1000
    this.webGlBlock = new WebGLBlock(this.rootElement)
    this.cssBlock = new CSSBlock(this.rootElement)
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          this.resize()
        }
      }
    })
  }

  init = (): void => {
    this.resizeObserver.observe(this.rootElement)
    this.rootElement.appendChild(this.webGlBlock.renderer.domElement)
    this.rootElement.appendChild(this.cssBlock.renderer.domElement)
    this.webGlBlock.init()
    this.cssBlock.init()
    this.webGlBlock.render()
    // this.webGlBlock.animate()
    // this.webGlBlock.composerRender()
    // this.webGlBlock.composerAnimate()
    // this.cssBlock.animate()
    this.cssBlock.render()
    this.resize()
  }

  resize = (): void => {
    this.webGlBlock.resize()
    this.cssBlock.resize()
  }

  clear = (): void => {
    this.webGlBlock.stopAnimate()
    this.cssBlock.stopAnimate()
    this.rootElement.removeChild(this.webGlBlock.renderer.domElement)
    this.rootElement.removeChild(this.cssBlock.renderer.domElement)
    this.resizeObserver.unobserve(this.rootElement)
  }

  setPage = (nextPage: Page): void => {
    heroImgState.page = nextPage
  }

  cameraAnimation1 = (): void => {
    const originCameraPosition = new THREE.Vector3(0, 0, 1000)
    const nextCameraPosition = new THREE.Vector3(0, 0, 0)
    const cameraCurrentPos = this.heroImgState.camera.position.clone()
    const cameraDestinationPos = nextCameraPosition.clone()

    this.webGlBlock.animate()
    this.cssBlock.animate()
    const cameraDuration = getDuration(
      cameraCurrentPos,
      cameraDestinationPos,
      2
    )

    new TWEEN.Tween(this.heroImgState.camera.position)
      .to(cameraDestinationPos, cameraDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.webGlBlock.stopAnimate()
        this.cssBlock.stopAnimate()
      })
  }

  cameraAnimation2 = (): void => {
    const originCameraPosition = new THREE.Vector3(0, 0, 1000)
    const nextCameraPosition = new THREE.Vector3(0, 0, 1000)
    const cameraCurrentPos = this.heroImgState.camera.position.clone()
    const cameraDestinationPos = nextCameraPosition.clone()
    this.webGlBlock.animate()
    this.cssBlock.animate()
    const cameraDuration = getDuration(
      cameraCurrentPos,
      cameraDestinationPos,
      2
    )

    new TWEEN.Tween(this.heroImgState.camera.position)
      .to(cameraDestinationPos, cameraDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.webGlBlock.stopAnimate()
        this.cssBlock.stopAnimate()
      })
  }
}

export default HomeImgBlock
