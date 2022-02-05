import React from 'react'
import { cx } from '@emotion/css'
import * as styles from './Work.styles'
import WorkBlockBox from './WorkBlockBox'
import getConfig from 'next/config'
import { BasePageProps } from '../types'

const { publicRuntimeConfig } = getConfig()

const { basePath = '' } = publicRuntimeConfig

const works = [
  {
    name: 'tokisite',
    title: 'TokiSite',
    imgSrc: `${basePath}/tokisite.png`,
    url: `${basePath}/`,
  },
  {
    name: 'psycholog-ui',
    title: 'Psycholog ui',
    imgSrc: `${basePath}/psycholog-storybook.png`,
    url: `https://psycholog-studio.github.io/psycholog/`,
  },
  {
    name: 'blog',
    title: 'Blog',
    imgSrc: `${basePath}/blog.png`,
    url: `https://tokileecy.medium.com/`,
  },
]

const Work = (props: BasePageProps): JSX.Element => {
  const { hide } = props

  return (
    <>
      {/* <div className={styles.leftBlock}>
        <MessageBox
          className={cx(styles.descriptionBox, { hide })}
        ></MessageBox>
      </div> */}
      <div className={cx(styles.rightBlock, { hide })}>
        <WorkBlockBox
          className={cx(styles.workBlockBox, { hide })}
          works={works}
        />
      </div>
    </>
  )
}

export default Work
