import React, { ReactNode } from 'react'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import { cx } from '@emotion/css'
import * as styles from './BaseLayer.styles'
import useLayerCSSObjectRef from '../useLayerCSSObjectRef'

export interface BaseLayerProps {
  hide?: boolean
  children?: ReactNode
}

const BaseLayer = (props: BaseLayerProps): JSX.Element => {
  const { children, hide } = props
  const [, aboutLayerRefCallback] = useLayerCSSObjectRef()

  return (
    <ThreeCSSObject className={styles.root} ref={aboutLayerRefCallback}>
      <div className={cx(styles.content, { hide })}>{children}</div>
    </ThreeCSSObject>
  )
}

export default BaseLayer
