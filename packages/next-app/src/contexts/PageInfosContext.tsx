import { createContext, PropsWithChildren } from 'react'

export type PageInfo = {
  name: string
  href: string
  text: string
  documentTitle: string
  pushState?: () => void
}

export type PageInfosProviderProps = PropsWithChildren<{
  pageInfoByPage: {
    [key: string]: PageInfo
  }
}>

const PageInfosContext = createContext<{
  [key: string]: PageInfo
}>({})

const PageInfosProvider = (props: PageInfosProviderProps) => {
  const { children, pageInfoByPage } = props
  return (
    <PageInfosContext.Provider value={pageInfoByPage}>
      {children}
    </PageInfosContext.Provider>
  )
}

const PageInfosComsumer = PageInfosContext.Consumer

export { PageInfosContext, PageInfosProvider, PageInfosComsumer }
