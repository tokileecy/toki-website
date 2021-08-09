import Head from 'next/head'
import HomePage from '../src/components/pages/Home'
import pageInfos from '../src/pageInfos'

export default function About(): JSX.Element {
  return (
    <>
      <Head>
        <title>{pageInfos.about.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
