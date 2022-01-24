import React, { useState } from 'react'
import Nav from './Nav'
import Layout from '../../../base/Layout'
import HomeLayer from './Layers/HomeLayer'
import AboutLayer from './Layers/AboutLayer'
import WorkLayer from './Layers/WorkLayer'
import ContactLayer from './Layers/ContactLayer'
import * as styles from './Home.styles'
import usePage from '../../../hooks/usePage'
import usePageInfos from '../../../hooks/usePageInfos'
import { cx } from '@emotion/css'

export type Page = 'home' | 'about' | 'work' | 'contact'

const HomePage = (): JSX.Element => {
  const { page, setPage } = usePage()
  const pageInfo = usePageInfos()

  const [hideFooter, setHideFooter] = useState(true)
  const handlePageChange = (nextPage: Page) => {
    setPage?.(nextPage)
  }

  const handleMenuClick = () => {
    console.log('prev', hideFooter)
    setHideFooter((prev) => !prev)
  }

  return (
    <Layout
      classes={{
        webglLayer: styles.webglLayer,
        uiLayer: styles.uiLayer,
      }}
      cssLayerContent={
        <>
          <HomeLayer hide={page !== 'home'} />
          <AboutLayer hide={page !== 'about'} />
          <WorkLayer hide={page !== 'work'} />
          <ContactLayer hide={page !== 'contact'} />
        </>
      }
    >
      <div className={styles.uiLayerWrapper}>
        <header className={styles.header}>
          <div>{pageInfo.pageInfoByPage[page]?.text}</div>
          <div className={styles.menu} onClick={handleMenuClick}>
            Menu
          </div>
        </header>
        <footer className={cx(styles.footer, { hide: hideFooter })}>
          <Nav
            classes={{
              root: styles.nav,
              navItem: styles.navItem,
            }}
            page={page}
            onPageChange={handlePageChange}
          />
        </footer>
      </div>
    </Layout>
  )
}

export default HomePage
