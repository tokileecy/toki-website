import Head from 'next/head'
import usePageInfos from '../src/hooks/usePageInfos'

export default function Home(): JSX.Element {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.pageInfoByPage.home.documentTitle}</title>
      </Head>
    </>
  )
}
