import Head from 'next/head'
import usePageInfos from '@/hooks/usePageInfos'

const About = (): JSX.Element => {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.pageInfoByPage.about.documentTitle}</title>
      </Head>
    </>
  )
}

export default About
