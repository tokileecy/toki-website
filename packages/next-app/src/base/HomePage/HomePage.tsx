import React, { FC } from 'react'
import usePageInfos from '../../hooks/usePageInfos'
import usePage from '../../hooks/usePage'
import BaseHome from '../../components/pages/Home'
import BaseAbout from '../../components/pages/About'
import BaseWork from '../../components/pages/Work'
import Layout from '../Layout'
import { cx } from '@emotion/css'
import * as styles from './HomePage.styles'

const useWrapper = (Comp: FC<{ hide?: boolean }>) => {
  const CompWithWrapper = ({ hide = false }: { hide?: boolean }) => {
    return (
      <div className={cx(styles.wrapper, { hide })}>
        <Comp hide={hide} />
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
  const pageInfos = usePageInfos()

  return (
    <Layout>
      <div className={styles.layoutWrap}>
        <Home hide={page !== pageInfos.pageInfoByPage['home'].name} />
        <About hide={page !== pageInfos.pageInfoByPage['about'].name} />
        <Work hide={page !== pageInfos.pageInfoByPage['work'].name} />
      </div>
    </Layout>
  )
}

export default HomePage
