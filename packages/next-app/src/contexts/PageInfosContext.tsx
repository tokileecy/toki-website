import { createContext, ReactNode } from 'react'
import getConfig from 'next/config'
import path from 'path'
import { Page } from '../base/Layout'
import { animation, invertAnimation } from '../base/scene'

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
