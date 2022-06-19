import React from 'react'
import { cx } from '@emotion/css'
import * as styles from './ScrollableContent.styles'
import BaseScrollableContent, {
  ScrollableContentProps,
} from '@psycholog-studio/ui/Containers/ScrollableBox/ScrollableContent'

const ScrollableContent = (inProps: ScrollableContentProps): JSX.Element => {
  const { className, ...props } = inProps
  return (
    <BaseScrollableContent {...props} className={cx(styles.root, className)} />
  )
}

export default ScrollableContent
