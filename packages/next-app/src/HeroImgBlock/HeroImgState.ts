import { makeObservable, observable, action } from 'mobx'
import * as THREE from 'three'
export type Page = 'home' | 'about' | 'work' | 'contact'

const pages = ['home', 'about', 'work', 'contact']

export type HeroImgTargetEvent = 'resize-hero-img' | 'aspect-ratio-change'
export interface ResizeHeroImgCallback extends EventListener {
  (): void
}

export type AspectRatioEventDetail = {
  prevValue: number
  value: number
}

interface AspectRatioChangeEvent extends Event {
  detail?: AspectRatioEventDetail
}

export interface AspectRatioCallback {
  (evt: AspectRatioChangeEvent): void
}

export type HeroImgEvent = {
  'resize-hero-img': ResizeHeroImgCallback
  'aspect-ratio-change': AspectRatioCallback
}

export class HeroImgEventTarget extends EventTarget {
  prevAspectRatio: number

  constructor() {
    super()
    this.prevAspectRatio = 1
  }

  resize = (): void => {
    this.dispatchEvent(new CustomEvent('resize-hero-img'))
  }

  aspectRatioChange = (value: number): void => {
    this.dispatchEvent(
      new CustomEvent<AspectRatioEventDetail>('aspect-ratio-change', {
        detail: {
          prevValue: this.prevAspectRatio,
          value,
        },
      })
    )
    this.prevAspectRatio = value
  }

  addEventListener = <K extends keyof HeroImgEvent>(
    type: K,
    callback: HeroImgEvent[K] | null,
    options?: boolean | AddEventListenerOptions
  ): void => {
    super.addEventListener(type, callback, options)
  }

  removeEventListener = (
    type: HeroImgTargetEvent,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions
  ): void => {
    super.removeEventListener(type, callback, options)
  }
}

export class HeroImgState {
  page: Page
  clock: THREE.Clock
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  heroImgEventTarget: HeroImgEventTarget

  constructor() {
    this.page = 'home'
    this.clock = new THREE.Clock()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)
    this.heroImgEventTarget = new HeroImgEventTarget()

    makeObservable(this, {
      page: observable,
      setPage: action,
      clock: observable.ref,
      scene: observable.ref,
      camera: observable.ref,
      heroImgEventTarget: observable.ref,
    })
  }

  setPage = (nextPage: string): void => {
    if (pages.includes(nextPage)) {
      this.page = nextPage as Page
    }
  }
}

export default new HeroImgState()
