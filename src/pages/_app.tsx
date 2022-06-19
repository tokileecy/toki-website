import React, { useEffect } from 'react'
import '@psycholog-studio/ui/reset.css'
import '../styles/main.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { PageInfosProvider } from '../contexts/PageInfosContext'
import HomePage from '../components/pages/HomePage'

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
      <HomePage />
      <Component {...pageProps} />
    </PageInfosProvider>
  )
}

export default MyApp