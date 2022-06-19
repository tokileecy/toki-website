import React, { forwardRef } from 'react'
import { cx } from '@emotion/css'
import * as styles from './Box.styles'
import BaseBox, { BoxProps, BoxRef } from '@psycholog-studio/ui/Containers/Box'

export type { BoxProps, BoxRef }

const Box = forwardRef((inProps: BoxProps, ref: BoxRef): JSX.Element => {
  const { className, ...props } = inProps
  return <BaseBox ref={ref} {...props} className={cx(styles.root, className)} />
})

Box.displayName = 'Box'

export default Box
