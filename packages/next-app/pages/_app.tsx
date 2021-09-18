import { useEffect } from 'react'
import '../styles/main.css'
import { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    document.body.classList.remove('hide')
  }, [])

  return (
    <>
      <Head>
        <title>About | Tokileecy</title>
        <meta name="description" content="Tokileecy's website" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
