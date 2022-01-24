import React from 'react'
import Nav from './Nav'
import Layout from '../../../base/Layout'
import HomeLayer from './Layers/HomeLayer'
import AboutLayer from './Layers/AboutLayer'
import WorkLayer from './Layers/WorkLayer'
import ContactLayer from './Layers/ContactLayer'
import * as styles from './Home.styles'
import usePage from '../../../hooks/usePage'
import usePageInfos from '../../../hooks/usePageInfos'

export type Page = 'home' | 'about' | 'work' | 'contact'

const HomePage = (): JSX.Element => {
  const { page, setPage } = usePage()
  const pageInfo = usePageInfos()

  const handlePageChange = (nextPage: Page) => {
    setPage?.(nextPage)
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
      <div className={styles.navContainer}>
        <div className={styles.pageLabel}>
          {pageInfo.pageInfoByPage[page]?.text}
        </div>
        <Nav page={page} onPageChange={handlePageChange} />
      </div>
    </Layout>
  )
}

export default HomePage
