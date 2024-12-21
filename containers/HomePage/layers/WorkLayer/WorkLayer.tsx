import React from 'react'
import { cx } from '@/styles/cssInstance'
import { Work } from '@/utils/baseTypes'
import * as styles from './WorkLayer.styles'
import WorkBlockBox from './WorkBlockBox'
import { BasePageProps } from '../types'

export interface WorkLayerProps extends BasePageProps {
  works: Work[]
}

const WorkLayer = (props: WorkLayerProps): JSX.Element => {
  const { works, show } = props

  return (
    <div className={styles.rightBlock}>
      <WorkBlockBox
        className={cx(styles.workBlockBox, { show, hide: show === false })}
        works={works.map((work) => ({
          name: work.id.toString(),
          title: work.name,
          imgSrc: work.banner.url,
        }))}
      />
    </div>
  )
}

export default WorkLayer
