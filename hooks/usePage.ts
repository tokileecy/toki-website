import { useRouter } from 'next/router'
import { Page } from '@/components/Layout'

interface PageUtils {
  page: Page
  setPage?: (page: Page) => void
}

export default function usePage() {
  const router = useRouter()
  const currentPagePath = router?.pathname.replace(/\//g, '')
  const page = (currentPagePath === '' ? 'home' : currentPagePath) as Page

  const setPage = (page: Page) => {
    router.push(page)
  }

  return {
    page,
    setPage,
  } as PageUtils
}
