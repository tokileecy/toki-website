import React from 'react'
import { cx } from '@/styles/cssInstance'
import * as styles from './WorkLayer.styles'
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

const WorkLayer = (props: BasePageProps): JSX.Element => {
  const { show } = props

  return (
    <div className={styles.rightBlock}>
      <WorkBlockBox
        className={cx(styles.workBlockBox, { show, hide: show === false })}
        works={works}
      />
    </div>
  )
}

export default WorkLayer
