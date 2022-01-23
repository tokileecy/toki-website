import React, { useRef, useCallback } from 'react'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { cx } from '@emotion/css'
import * as styles from './WorkLayer.styles'
import WorkBlockBox from './WorkBlockBox'

export interface HomeLayerProps {
  hide?: boolean
}

const works = [
  {
    name: 'blog',
    title: 'Blog',
    imgSrc: '/blog.png',
  },
  {
    name: 'tokisite',
    title: 'TokiSite',
    imgSrc: '/tokisite.png',
  },
]

const WorkLayer = (props: HomeLayerProps): JSX.Element => {
  const { hide = true } = props
  const aboutLayerRef = useRef<CSS3DObject | null>(null)
  const aboutLayerRefCallback = useCallback((obj) => {
    if (obj) {
      aboutLayerRef.current = obj
      obj.position.z = 40
    }
  }, [])

  return (
    <ThreeCSSObject
      ref={aboutLayerRefCallback}
      className={cx(styles.root, { hide })}
    >
      <div className={styles.content}>
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
