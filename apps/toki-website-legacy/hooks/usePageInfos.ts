import { useContext } from 'react'
import { Page } from '@/components/Layout'
import { PageInfosContext } from '@/contexts/PageInfosContext'

export type PageInfo = {
  name: Page
  href: string
  text: string
  documentTitle: string
  pushState: () => void
}

export default function usePageInfos() {
  const pageInfos = useContext(PageInfosContext)

  return pageInfos
}
