import { useContext } from 'react'
import { Page } from '../base/Layout'
import { PageInfosContext } from '../contexts/PageInfosContext'

export type PageInfo = {
  name: Page
  href: string
  text: string
  documentTitle: string
  pushState: () => void
}

const usePageInfos = () => {
  const pageInfos = useContext(PageInfosContext)

  return pageInfos
}

export default usePageInfos
