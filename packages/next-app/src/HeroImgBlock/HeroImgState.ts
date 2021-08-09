import { makeObservable, observable, action } from 'mobx'

export type Page = 'home' | 'about' | 'work' | 'contact'

const pages = ['home', 'about', 'work', 'contact']

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
