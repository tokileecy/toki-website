import { Page } from './HeroImgBlock/HeroImgState'
export type PageInfo = {
  name: Page
  href: string
  text: string
  documentTitle: string
}

const pageInfos: {
  [key in Page]?: PageInfo
} = {
  home: {
    name: 'home',
    href: '/',
    text: 'Home',
    documentTitle: 'Tokileecy',
  },
  about: {
    name: 'about',
    href: '/about',
    text: 'About',
    documentTitle: 'About | Tokileecy',
  },
  blog: {
    name: 'blog',
    href: '/blog',
    text: 'Blog',
    documentTitle: 'Blog | Tokileecy',
  },
  contact: {
    name: 'contact',
    href: '/contact',
    text: 'Contact',
    documentTitle: 'Contact | Tokileecy',
  },
}

export default pageInfos
