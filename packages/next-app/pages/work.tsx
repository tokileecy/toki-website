import Head from 'next/head'
import usePageInfos from '../src/hooks/usePageInfos'
import dynamic, { LoaderComponent } from 'next/dynamic'

const HomePage = dynamic(
  () =>
    import('../src/components/pages/Home').then(
      (mod) => mod.default
    ) as LoaderComponent,
  { ssr: false }
)

export default function Blog(): JSX.Element {
  const pageInfos = usePageInfos()
  return (
    <>
      <Head>
        <title>{pageInfos.work.documentTitle}</title>
      </Head>
      <HomePage />
    </>
  )
}
