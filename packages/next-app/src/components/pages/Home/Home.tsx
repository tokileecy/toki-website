import React from 'react'
import Nav from './Nav'
import Layout from '../../../base/Layout'
import HomeLayer from './Layers/HomeLayer'
import AboutLayer from './Layers/AboutLayer'
import WorkLayer from './Layers/WorkLayer'
import ContactLayer from './Layers/ContactLayer'
import * as styles from './Home.styles'
import ShadowBox from './ShadowBox'
import usePage from '../../../hooks/usePage'

export type Page = 'home' | 'about' | 'work' | 'contact'

const HomePage = (): JSX.Element => {
  const { page, setPage } = usePage()

  return (
    <Layout
      cssLayerContent={
        <>
          <HomeLayer hide={page !== 'home'} />
          <AboutLayer hide={page !== 'about'} />
          <WorkLayer hide={page !== 'work'} />
          <ContactLayer hide={page !== 'contact'} />
        </>
      }
    >
      <ShadowBox />
      <div className={styles.navContainer}>
        <Nav
          page={page}
          className={styles.nav}
          onPageChange={(nextPage: Page) => {
            setPage?.(nextPage)
          }}
        />
      </div>
    </Layout>
  )
}

export default HomePage
