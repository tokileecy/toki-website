import React, { useContext, useEffect, useState } from 'react'
import usePageInfos from '@/hooks/usePageInfos'
import usePage from '@/hooks/usePage'
import AppContext from '@/contexts/AppContext'
import Layout from '@/components/Layout'
import { SkillCategory, Work as WorkData } from '@/utils/baseTypes'
import BaseHome from './layers/HomeLayer'
import BaseAbout from './layers/AboutLayer'
import BaseWork from './layers/WorkLayer'
import * as styles from './HomePage.styles'
import useWrapper from './useWrapper'

const Home = useWrapper(BaseHome)
const About = useWrapper(BaseAbout)
const Work = useWrapper(BaseWork)

export interface HomePageProps {
  skillCategories: SkillCategory[]
  name: string
  description: string
  works: WorkData[]
}

const HomePage = (props: HomePageProps): JSX.Element => {
  const { name, description, skillCategories, works } = props
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
          skillCategories={skillCategories}
          name={name}
          description={description}
          show={
            !isStartup
              ? undefined
              : page === pageInfos.pageInfoByPage['about'].name
          }
        />
        <Work
          works={works}
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
