import React from 'react'
import '@psycholog-studio/ui/reset.css'
import '../styles/main.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { PageInfosProvider } from '../src/contexts/PageInfosContext'
import { AppProvider } from '../src/contexts/AppContext'
import HomePage from '../src/base/HomePage'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PageInfosProvider>
      <Head>
        <meta name="description" content="Tokileecy's website" />
        <script src="/scripts/justfont.js"></script>
      </Head>
      <AppProvider>
        <HomePage />
        <Component {...pageProps} />
      </AppProvider>
    </PageInfosProvider>
  )
}

export default MyApp
