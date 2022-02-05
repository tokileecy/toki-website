import Head from 'next/head'
import usePageInfos from '../src/hooks/usePageInfos'

const Work = (): JSX.Element => {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.pageInfoByPage.work.documentTitle}</title>
      </Head>
    </>
  )
}

export default Work
