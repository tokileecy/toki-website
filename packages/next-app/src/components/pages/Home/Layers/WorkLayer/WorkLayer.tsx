import React from 'react'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import { cx } from '@emotion/css'
import * as styles from './WorkLayer.styles'
import WorkBlockBox from './WorkBlockBox'
import useLayerCSSObjectRef from '../useLayerCSSObjectRef'

export interface HomeLayerProps {
  hide?: boolean
}

const works = [
  {
    name: 'tokisite',
    title: 'TokiSite',
    imgSrc: '/tokisite.png',
  },
  {
    name: 'psycholog-ui',
    title: 'Psycholog ui',
    imgSrc: '/psycholog-storybook.png',
  },
  {
    name: 'blog',
    title: 'Blog',
    imgSrc: '/blog.png',
  },
]

const WorkLayer = (props: HomeLayerProps): JSX.Element => {
  const { hide = true } = props
  const [, aboutLayerRefCallback] = useLayerCSSObjectRef()

  return (
    <ThreeCSSObject ref={aboutLayerRefCallback} className={styles.root}>
      <div className={cx(styles.content, { hide })}>
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
      </div>
    </ThreeCSSObject>
  )
}

export default WorkLayer
