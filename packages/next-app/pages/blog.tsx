import Head from 'next/head'
import HomePage from '../src/components/pages/Home'
import pageInfos from '../src/pageInfos'

export default function Blog(): JSX.Element {
  return (
    <>
      <Head>
        <title>{pageInfos.blog.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
