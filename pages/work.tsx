import Head from 'next/head'
import usePageInfos from '@/hooks/usePageInfos'
import HomePage, { HomePageProps } from '@/components/pages/HomePage'
import api from '@/lib/api'

function Work(props: HomePageProps) {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.pageInfoByPage.work.documentTitle}</title>
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

export default Work
