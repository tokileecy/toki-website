import Head from 'next/head'
import HomePage from '../src/components/pages/Home'
import pageInfos from '../src/pageInfos'

export default function Contact(): JSX.Element {
  return (
    <>
      <Head>
        <title>{pageInfos.contact.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
