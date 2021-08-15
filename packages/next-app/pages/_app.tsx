import { injectGlobal } from '@emotion/css'
import { AppProps } from 'next/app'
import Head from 'next/head'

injectGlobal`
  html {
    overflow: hidden;
    @supports (height: fill-available) or (height: -webkit-fill-available) or (height: -moz-available)  {
      height: fill-available;
    }
  }
  
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    width: 100%;
    height: 100%;
  }

  #__next {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
