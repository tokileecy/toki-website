import { useContext } from 'react'
import AppContext, { AppContextContent } from '../contexts/AppContext'

const usePage = (): AppContextContent => {
  const appContext = useContext(AppContext)

  return appContext
}

export default usePage
