import { createContext, ReactNode, useContext } from 'react'
import { AppContext } from '@/contexts/AppContext'
import { Page } from '@/components/Layout'
import { animation, invertAnimation } from '@/manager/scene'

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

  const { setIsAnimating } = useContext(AppContext)

  const pageInfoByPage = {
    home: {
      name: 'home',
      href: '/',
      text: 'Home',
      documentTitle: 'Tokileecy',
      pushState: async (): Promise<void> => {
        setIsAnimating(true)
        await invertAnimation()
        setIsAnimating(false)
      },
    },
    about: {
      name: 'about',
      href: '/about',
      text: 'About',
      documentTitle: 'About | Tokileecy',
      pushState: async (): Promise<void> => {
        setIsAnimating(true)
        await animation()
        setIsAnimating(false)
      },
    },
    work: {
      name: 'work',
      href: '/work',
      text: 'Work',
      documentTitle: 'Work | Tokileecy',
      pushState: async (): Promise<void> => {
        setIsAnimating(true)
        await animation()
        setIsAnimating(false)
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
