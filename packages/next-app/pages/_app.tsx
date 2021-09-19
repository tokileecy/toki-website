import { useEffect } from 'react'
import '../styles/main.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import getConfig from 'next/config'
import { PageInfosProvider } from '../src/contexts/PageInfosContext'
import path from 'path'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { publicRuntimeConfig } = getConfig()
  const { basePath = '' } = publicRuntimeConfig

  useEffect(() => {
    document.body.classList.remove('hide')
  }, [])

  const pageInfoByPage = {
    home: {
      name: 'home',
      href: '/',
      text: 'Home',
      documentTitle: 'Tokileecy',
      pushState: (): void => {
        window.history.pushState(null, `page home`, path.resolve(basePath))
        document.title = 'Tokileecy'
      },
    },
    about: {
      name: 'about',
      href: '/about',
      text: 'About',
      documentTitle: 'About | Tokileecy',
      pushState: (): void => {
        window.history.pushState(
          null,
          `page about`,
          path.resolve(basePath, 'about')
        )
        document.title = 'About | Tokileecy'
      },
    },
    work: {
      name: 'work',
      href: '/work',
      text: 'Work',
      documentTitle: 'Work | Tokileecy',
      pushState: (): void => {
        window.history.pushState(
          null,
          `page work`,
          path.resolve(basePath, 'work')
        )
        document.title = 'Work | Tokileecy'
      },
    },
    contact: {
      name: 'contact',
      href: '/contact',
      text: 'Contact',
      documentTitle: 'Contact | Tokileecy',
      pushState: (): void => {
        window.history.pushState(
          null,
          `page contact`,
          path.resolve(basePath, 'contact')
        )
        document.title = 'Contact | Tokileecy'
      },
    },
  }

  return (
    <PageInfosProvider pageInfoByPage={pageInfoByPage}>
      <Head>
        <title>About | Tokileecy</title>
        <meta name="description" content="Tokileecy's website" />
      </Head>
      <Component {...pageProps} />
    </PageInfosProvider>
  )
}

export default MyApp
