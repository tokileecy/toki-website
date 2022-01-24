import React from 'react'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import { cx } from '@emotion/css'
import * as styles from './WorkLayer.styles'
import WorkBlockBox from './WorkBlockBox'
import getConfig from 'next/config'
import BaseLayer, { BaseLayerProps } from '../BaseLayer'

const { publicRuntimeConfig } = getConfig()

const { basePath = '' } = publicRuntimeConfig

const works = [
  {
    name: 'tokisite',
    title: 'TokiSite',
    imgSrc: `${basePath}/tokisite.png`,
  },
  {
    name: 'psycholog-ui',
    title: 'Psycholog ui',
    imgSrc: `${basePath}/psycholog-storybook.png`,
  },
  {
    name: 'blog',
    title: 'Blog',
    imgSrc: `${basePath}/blog.png`,
  },
]

export type WorkLayerProps = Omit<BaseLayerProps, 'children'>

const WorkLayer = (props: WorkLayerProps): JSX.Element => {
  const { hide } = props

  return (
    <BaseLayer hide={hide}>
      <div className={styles.leftBlock}>
        <MessageBox
          className={cx(styles.descriptionBox, { hide })}
        ></MessageBox>
      </div>
      <div className={cx(styles.rightBlock, { hide })}>
        <WorkBlockBox
          className={cx(styles.workBlockBox, { hide })}
          works={works}
        />
      </div>
    </BaseLayer>
  )
}

export default WorkLayer
