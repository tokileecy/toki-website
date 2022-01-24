import React from 'react'
// import SpriteBox from './SpriteBox'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import { cx } from '@emotion/css'
import * as styles from './HomeLayer.styles'
import BaseLayer, { BaseLayerProps } from '../BaseLayer'

export type HomeLayerProps = Omit<BaseLayerProps, 'children'>

const HomeLayer = (props: HomeLayerProps): JSX.Element => {
  const { hide } = props

  return (
    <BaseLayer hide={hide}>
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
    </BaseLayer>
  )
}

export default HomeLayer
