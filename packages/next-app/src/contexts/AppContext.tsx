import React, { ReactNode, createContext } from 'react'
import { useRouter } from 'next/router'

import { Page } from '../base/Layout'

export interface AppContextContent {
  page: Page
  // setPage?: Dispatch<SetStateAction<Page>>
  setPage?: (page: Page) => void
}

const AppContext = createContext<AppContextContent>({
  page: 'home',
})

export interface AppProviderProps {
  children?: ReactNode
}

export const AppProvider = (props: AppProviderProps): JSX.Element => {
  const { children } = props

  const router = useRouter()
  const currentPagePath = router?.pathname.replace(/\//g, '')
  const page = (currentPagePath === '' ? 'home' : currentPagePath) as Page

  const setPage = (page: Page) => {
    router.push(page)
  }

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
