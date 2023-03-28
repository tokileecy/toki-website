import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import 'default-passive-events'
import { AppProvider } from '@/contexts/AppContext'
import { PageInfosProvider } from '@/contexts/PageInfosContext'
import '@psycholog-studio/ui/reset.css'
import '@/styles/main.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    document.body.classList.remove('hide')
  }, [])

  return (
    <AppProvider>
      <PageInfosProvider>
        <Head>
          <meta name="description" content="Tokileecy's website" />
          <link rel="icon" href="/favicon.png" sizes="16x16" type="image/png" />
          {/* <script src="/scripts/justfont.js"></script> */}
        </Head>
        <Component {...pageProps} />
      </PageInfosProvider>
    </AppProvider>
  )
}

export default MyApp
