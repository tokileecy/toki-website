import React, {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { useRouter } from 'next/router'

import { Page } from '../components/pages/Home'

export interface AppContextContent {
  page: Page
  setPage?: Dispatch<SetStateAction<Page>>
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
  const initPage = (currentPagePath === '' ? 'home' : currentPagePath) as Page

  const [page, setPage] = useState<Page>(initPage)

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
