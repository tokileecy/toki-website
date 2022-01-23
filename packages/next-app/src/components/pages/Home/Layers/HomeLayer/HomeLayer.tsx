import React from 'react'
// import SpriteBox from './SpriteBox'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import { cx } from '@emotion/css'
import * as styles from './HomeLayer.styles'
import useLayerCSSObjectRef from '../useLayerCSSObjectRef'
export interface HomeLayerProps {
  hide?: boolean
}

const HomeLayer = (props: HomeLayerProps): JSX.Element => {
  const { hide = true } = props
  const [, homeLayerRefCallback] = useLayerCSSObjectRef()

  return (
    <ThreeCSSObject ref={homeLayerRefCallback} className={styles.root}>
      <div className={cx(styles.content, { hide })}>
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
          {/* <SpriteBox
            className={cx(styles.spriteBox, {
              hide,
            })}
          /> */}
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
