import { makeObservable, observable, action } from 'mobx'
import * as THREE from 'three'
export type Page = 'home' | 'about' | 'work' | 'contact'

const pages = ['home', 'about', 'work', 'contact']

export class HeroImgState {
  page: Page
  clock: THREE.Clock

  constructor() {
    this.page = 'home'
    this.clock = new THREE.Clock()

    makeObservable(this, {
      page: observable,
      setPage: action,
      clock: observable.ref,
    })
  }

  setPage = (nextPage: string): void => {
    if (pages.includes(nextPage)) {
      this.page = nextPage as Page
    }
  }
}

export default new HeroImgState()
