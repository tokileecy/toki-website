import getConfig from 'next/config'
import { Page } from '@/components/Layout'
const { publicRuntimeConfig } = getConfig()
const { basePath = '' } = publicRuntimeConfig

export const getInitPage = () => {
  let initPage: Page = 'home'

  if (typeof document !== 'undefined') {
    const pathname = document.location.pathname.replace(basePath, '')
    const currentPagePath = pathname.replace(/\//g, '')
    initPage = (currentPagePath === '' ? 'home' : currentPagePath) as Page
  }

  return initPage
}
