import React, { useEffect } from 'react'
import '@psycholog-studio/ui/reset.css'
import '../styles/main.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { PageInfosProvider } from '../contexts/PageInfosContext'
import { AppProvider } from '../contexts/AppContext'
import HomePage from '../base/HomePage'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    document.body.classList.remove('hide')
  }, [])

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
