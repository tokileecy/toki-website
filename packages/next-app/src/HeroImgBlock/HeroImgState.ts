import { makeObservable, observable, action } from 'mobx'

export type Page = 'home' | 'about' | 'blog' | 'contact'

const pages = ['home', 'about', 'blog', 'contact']

export class HeroImgState {
  page: Page
  constructor() {
    this.page = 'home'
    makeObservable(this, {
      page: observable,
      setPage: action,
    })
  }

  setPage = (nextPage: string): void => {
    if (pages.includes(nextPage)) {
      this.page = nextPage as Page
    }
  }
}

export default new HeroImgState()
