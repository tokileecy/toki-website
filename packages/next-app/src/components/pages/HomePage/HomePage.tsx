import React, { FC, useEffect, useState } from 'react'
import usePageInfos from '../../../hooks/usePageInfos'
import usePage from '../../../hooks/usePage'
import BaseHome from './layers/HomeLayer'
import BaseAbout from './layers/AboutLayer'
import BaseWork from './layers/WorkLayer'
import Layout from '../../Layout'
import { cx } from '@emotion/css'
import * as styles from './HomePage.styles'

const useWrapper = (Comp: FC<{ show?: boolean }>) => {
  const CompWithWrapper = ({ show }: { show?: boolean }) => {
    return (
      <div className={cx(styles.wrapper, { hide: !show })}>
        <Comp show={show} />
      </div>
    )
  }
  return CompWithWrapper
}

const Home = useWrapper(BaseHome)
const About = useWrapper(BaseAbout)
const Work = useWrapper(BaseWork)

const HomePage = (): JSX.Element => {
  const { page } = usePage()
  const [isStartup, setIsStartup] = useState(false)
  const pageInfos = usePageInfos()

  useEffect(() => {
    setIsStartup(true)
  }, [])

  return (
    <Layout isStartup={isStartup}>
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
