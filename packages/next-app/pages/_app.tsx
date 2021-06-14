import { injectGlobal } from '@emotion/css'
import { AppProps } from 'next/app'
import Head from 'next/head'

injectGlobal`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
  }
`

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
