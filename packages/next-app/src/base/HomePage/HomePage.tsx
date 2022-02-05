import React, { FC } from 'react'
import usePageInfos from '../../hooks/usePageInfos'
import usePage from '../../hooks/usePage'
import BaseHome from '../../components/pages/Home'
import BaseAbout from '../../components/pages/About'
import BaseWork from '../../components/pages/Work'
import Layout from '../Layout'
import { cx, css } from '@emotion/css'

const useWrapper = (Comp: FC<{ hide?: boolean }>) => {
  const CompWithWrapper = ({ hide = false }: { hide?: boolean }) => {
    return (
      <div
        className={cx(
          css`
            position: absolute;
            z-index: 5;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;

            &.hide {
              pointer-events: none;
              user-select: none;
              z-index: -1000;
            }
          `,
          { hide }
        )}
      >
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
      <Home hide={page !== pageInfos.pageInfoByPage['home'].name} />
      <About hide={page !== pageInfos.pageInfoByPage['about'].name} />
      <Work hide={page !== pageInfos.pageInfoByPage['work'].name} />
    </Layout>
  )
}

export default HomePage
