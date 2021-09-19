import Head from 'next/head'
import HomePage from '../src/components/pages/Home'
import usePageInfos from '../src/hooks/usePageInfos'

export default function Blog(): JSX.Element {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.work.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
