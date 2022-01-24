import React, { ReactNode } from 'react'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import { cx } from '@emotion/css'
import * as styles from './BaseLayer.styles'
import useLayerCSSObjectRef from '../useLayerCSSObjectRef'

export type BaseLayerClassesKey = 'root' | 'content'
export interface BaseLayerProps {
  className?: string
  hide?: boolean
  children?: ReactNode
  classes?: {
    [k in BaseLayerClassesKey]?: string
  }
}

const BaseLayer = (props: BaseLayerProps): JSX.Element => {
  const { classes = {}, className, children, hide } = props
  const [, aboutLayerRefCallback] = useLayerCSSObjectRef()

  return (
    <ThreeCSSObject
      className={cx(styles.root, classes.root, className)}
      ref={aboutLayerRefCallback}
    >
      <div className={cx(styles.content, { hide }, classes.content)}>
        {children}
      </div>
    </ThreeCSSObject>
  )
}

export default BaseLayer
