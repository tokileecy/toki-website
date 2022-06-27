import React, { useContext, useEffect, useState } from 'react'
import usePageInfos from '@/hooks/usePageInfos'
import usePage from '@/hooks/usePage'
import BaseHome from './layers/HomeLayer'
import BaseAbout from './layers/AboutLayer'
import BaseWork from './layers/WorkLayer'
import Layout from '../../Layout'
import * as styles from './HomePage.styles'
import useWrapper from './useWrapper'
import AppContext from '@/contexts/AppContext'

const Home = useWrapper(BaseHome)
const About = useWrapper(BaseAbout)
const Work = useWrapper(BaseWork)

const HomePage = (): JSX.Element => {
  const { page } = usePage()
  const [isStartup, setIsStartup] = useState(false)
  const pageInfos = usePageInfos()
  const { isAnimating } = useContext(AppContext)

  useEffect(() => {
    setIsStartup(true)
  }, [])

  return (
    <Layout isStartup={isStartup} disableNavClick={isAnimating}>
      <div className={styles.layoutWrap}>
        <Home
          show={
            !isStartup
              ? undefined
              : page === pageInfos.pageInfoByPage['home'].name
          }
        />
        <About
          show={
            !isStartup
              ? undefined
              : page === pageInfos.pageInfoByPage['about'].name
          }
        />
        <Work
          show={
            !isStartup
              ? undefined
              : page === pageInfos.pageInfoByPage['work'].name
          }
        />
      </div>
    </Layout>
  )
}

export default HomePage
