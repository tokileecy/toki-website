import { createContext, ReactNode } from 'react'
import { Page } from '../components/Layout'
import { animation, invertAnimation } from '../graphic/scene'

export type PageInfo = {
  name: Page
  href: string
  text: string
  documentTitle: string
  pushState?: () => void
}

export interface PageInfosProviderProps {
  children: ReactNode
}

const PageInfosContext = createContext<{
  pageInfoByPage: { [key: string]: PageInfo }
  pages: Page[]
}>({ pageInfoByPage: {}, pages: [] })

const PageInfosProvider = (props: PageInfosProviderProps): JSX.Element => {
  const { children } = props

  const pageInfoByPage = {
    home: {
      name: 'home',
      href: '/',
      text: 'Home',
      documentTitle: 'Tokileecy',
      pushState: (): void => {
        invertAnimation()
      },
    },
    about: {
      name: 'about',
      href: '/about',
      text: 'About',
      documentTitle: 'About | Tokileecy',
      pushState: (): void => {
        animation()
      },
    },
    work: {
      name: 'work',
      href: '/work',
      text: 'Work',
      documentTitle: 'Work | Tokileecy',
      pushState: (): void => {
        animation()
      },
    },
  } as const

  return (
    <PageInfosContext.Provider
      value={{
        pageInfoByPage,
        pages: ['home', 'about', 'work'],
      }}
    >
      {children}
    </PageInfosContext.Provider>
  )
}

const PageInfosComsumer = PageInfosContext.Consumer

export { PageInfosContext, PageInfosProvider, PageInfosComsumer }
