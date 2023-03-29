import Head from 'next/head'
import usePageInfos from '@/hooks/usePageInfos'
import HomePage, { HomePageProps } from '@/containers/HomePage'
import api from '@/lib/api'

export default function About(props: HomePageProps) {
  const pageInfos = usePageInfos()

  return (
    <>
      <Head>
        <title>{pageInfos.pageInfoByPage.about.documentTitle}</title>
      </Head>
      <HomePage {...props} />
    </>
  )
}

export async function getStaticProps() {
  const data = await api.getData()

  return {
    props: {
      ...data,
    },
  }
}
