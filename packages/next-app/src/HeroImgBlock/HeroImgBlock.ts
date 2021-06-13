import * as THREE from 'three'
import CSSBlock from './CSSBlock'
import WebGLBlock from './WebGLBlock'

type GraphRootElementRef = { current: HTMLElement | null }

class HomeImgBlock {
  resizeObserver: ResizeObserver
  rootElement: HTMLElement
  clock: THREE.Clock
  webGlBlock: WebGLBlock
  cssBlock: CSSBlock

  constructor(graphRoot: GraphRootElementRef) {
    if (graphRoot.current !== null) {
      this.rootElement = graphRoot.current
    } else {
      this.rootElement = document.createElement('div')
      console.warn(`graphRoot.current should not be ${graphRoot.current}`)
    }

    this.clock = new THREE.Clock()
    this.webGlBlock = new WebGLBlock(this.clock, this.rootElement)
    this.cssBlock = new CSSBlock(this.clock, this.rootElement)
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          this.resize()
        }
      }
    })
  }

  init(): void {
    this.resizeObserver.observe(this.rootElement)
    this.rootElement.appendChild(this.webGlBlock.renderer.domElement)
    this.rootElement.appendChild(this.cssBlock.renderer.domElement)
    this.webGlBlock.init()
    this.cssBlock.init()
    this.webGlBlock.animate()
    this.cssBlock.render()
    this.resize()
  }

  resize(): void {
    this.webGlBlock.resize()
    this.cssBlock.resize()
  }

  clear(): void {
    this.webGlBlock.stopAnimate()
    this.rootElement.removeChild(this.webGlBlock.renderer.domElement)
    this.rootElement.removeChild(this.cssBlock.renderer.domElement)
    this.resizeObserver.unobserve(this.rootElement)
  }
}

export default HomeImgBlock
