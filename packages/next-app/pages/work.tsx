import Head from 'next/head'
import usePageInfos from '../src/hooks/usePageInfos'
import HomePage from '../src/components/pages/Home'

export default function Blog(): JSX.Element {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.pageInfoByPage.work.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
