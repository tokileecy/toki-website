import Head from 'next/head'
import usePageInfos from '@/hooks/usePageInfos'
import HomePage, { HomePageProps } from '@/components/pages/HomePage'
import api from '@/lib/api'

export default function Home(props: HomePageProps) {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.pageInfoByPage.home.documentTitle}</title>
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
