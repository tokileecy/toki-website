import React, { useRef, useCallback } from 'react'
import SpriteBox from './SpriteBox'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { cx } from '@emotion/css'
import * as styles from './HomeLayer.styles'
export interface HomeLayerProps {
  hide?: boolean
}
const HomeLayer = (props: HomeLayerProps): JSX.Element => {
  const { hide = true } = props
  const homeLayerRef = useRef<CSS3DObject | null>(null)
  const homeLayerRefCallback = useCallback((obj) => {
    if (obj) {
      homeLayerRef.current = obj
      obj.position.z = 40
    }
  }, [])

  return (
    <ThreeCSSObject
      ref={homeLayerRefCallback}
      className={cx(styles.root, { hide })}
    >
      <div className={styles.content}>
        <div className={styles.topBlock}>
          <MessageBox
            className={cx(styles.grettingBox, {
              hide,
            })}
          >
            {" HI !  I'm tokileecy"}
          </MessageBox>
        </div>
        <div className={styles.bottomBlock}>
          <SpriteBox
            className={cx(styles.spriteBox, {
              hide,
            })}
          />
          <MessageBox
            className={cx(styles.descriptionBox, {
              hide,
            })}
          >
            <span>{'Wellcome to Toki`s Website!'}</span>
            <div className={styles.developing}>{'（頁面開發中...）'}</div>
          </MessageBox>
        </div>
      </div>
    </ThreeCSSObject>
  )
}

export default HomeLayer
