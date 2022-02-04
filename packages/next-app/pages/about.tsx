import Head from 'next/head'
import usePageInfos from '../src/hooks/usePageInfos'
import HomePage from '../src/components/pages/Home'

export default function About(): JSX.Element {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.pageInfoByPage.about.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
