import { createContext, ReactNode } from 'react'
import getConfig from 'next/config'
import path from 'path'
import { Page } from '../components/pages/Home'

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
  const { publicRuntimeConfig } = getConfig()

  const { basePath = '' } = publicRuntimeConfig

  const pageInfoByPage = {
    home: {
      name: 'home',
      href: '/',
      text: 'Home',
      documentTitle: 'Tokileecy',
      pushState: (): void => {
        window.history.pushState(null, `page home`, path.resolve(basePath))
        document.title = 'Tokileecy'
      },
    },
    about: {
      name: 'about',
      href: '/about',
      text: 'About',
      documentTitle: 'About | Tokileecy',
      pushState: (): void => {
        window.history.pushState(
          null,
          `page about`,
          path.resolve(basePath, 'about')
        )
        document.title = 'About | Tokileecy'
      },
    },
    work: {
      name: 'work',
      href: '/work',
      text: 'Work',
      documentTitle: 'Work | Tokileecy',
      pushState: (): void => {
        window.history.pushState(
          null,
          `page work`,
          path.resolve(basePath, 'work')
        )
        document.title = 'Work | Tokileecy'
      },
    },
    contact: {
      name: 'contact',
      href: '/contact',
      text: 'Contact',
      documentTitle: 'Contact | Tokileecy',
      pushState: (): void => {
        window.history.pushState(
          null,
          `page contact`,
          path.resolve(basePath, 'contact')
        )
        document.title = 'Contact | Tokileecy'
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
