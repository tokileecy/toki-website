import { useEffect } from 'react'
import '../styles/main.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { PageInfosProvider } from '../src/contexts/PageInfosContext'

import { AppProvider } from '../src/contexts/AppContext'
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    document.body.classList.remove('hide')
  }, [])

  return (
    <PageInfosProvider>
      <Head>
        <meta name="description" content="Tokileecy's website" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </PageInfosProvider>
  )
}

export default MyApp
