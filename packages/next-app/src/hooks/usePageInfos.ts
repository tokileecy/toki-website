import { useContext } from 'react'
import { Page } from '../HeroImgBlock/HeroImgState'
import { PageInfosContext } from '../contexts/PageInfosContext'

export type PageInfo = {
  name: Page
  href: string
  text: string
  documentTitle: string
  pushState: () => void
}

const usePageInfos = (): {
  [key in Page]?: PageInfo
} => {
  const pageInfos = useContext(PageInfosContext)

  return pageInfos
}

export default usePageInfos
