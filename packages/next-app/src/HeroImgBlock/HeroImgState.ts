import { makeObservable, observable, action } from 'mobx'
import * as THREE from 'three'
export type Page = 'home' | 'about' | 'work' | 'contact'

const pages = ['home', 'about', 'work', 'contact']

export class HeroImgState {
  page: Page
  clock: THREE.Clock
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera

  constructor() {
    this.page = 'home'
    this.clock = new THREE.Clock()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(0, 0, 0, 0)

    makeObservable(this, {
      page: observable,
      setPage: action,
      clock: observable.ref,
      scene: observable.ref,
      camera: observable.ref,
    })
  }

  setPage = (nextPage: string): void => {
    if (pages.includes(nextPage)) {
      this.page = nextPage as Page
    }
  }
}

export default new HeroImgState()
