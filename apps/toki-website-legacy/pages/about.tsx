import Head from 'next/head'
import usePageInfos from '@/hooks/usePageInfos'
import HomePage, { HomePageProps } from '@/containers/HomePage'
import data from '@/utils/tempDatas.json'

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
  return {
    props: {
      ...data,
    },
  }
}
