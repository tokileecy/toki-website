import Head from 'next/head'
import HomePage from '../src/components/pages/Home'
import usePageInfos from '../src/hooks/usePageInfos'

export default function Home(): JSX.Element {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.home.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
