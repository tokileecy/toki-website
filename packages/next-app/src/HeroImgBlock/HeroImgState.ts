import { makeObservable, observable, action } from 'mobx'

export type Page = 'home' | 'about' | 'blog' | 'contact'


export class HeroImgState {
  page: Page
  constructor() {
    this.page = 'home'
    makeObservable(this, {
      page: observable,
      setPage: action,
    })
  }

  setPage = (nextPage: Page): void => {
    this.page = nextPage
  }
}

export default new HeroImgState()
