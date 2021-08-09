import Head from 'next/head'
import HomePage from '../src/components/pages/Home'
import pageInfos from '../src/pageInfos'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>{pageInfos.home.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
