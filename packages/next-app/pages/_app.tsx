import React from 'react'
import '@psycholog-studio/ui/reset.css'
import '../styles/main.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { PageInfosProvider } from '../src/contexts/PageInfosContext'

import { AppProvider } from '../src/contexts/AppContext'
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
