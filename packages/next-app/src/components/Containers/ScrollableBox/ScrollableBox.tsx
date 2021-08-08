import React from 'react'
import Box from '../Box'
import ScrollableContent from './ScrollableContent'
import { cx } from '@emotion/css'

export type ScrollableContentProps = React.HTMLAttributes<HTMLDivElement>

export type ScrollableBoxClassKey = 'root' | 'content'

export type ScrollableBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  classes?: {
    [ken in ScrollableBoxClassKey]?: string
  }
}

const ScrollableBox = (inProps: ScrollableBoxProps): JSX.Element => {
  const { classes = {}, className, children, ...props } = inProps
  return (
    <Box {...props} className={cx(classes.root, className)}>
      <ScrollableContent className={classes.content}>
        {children}
      </ScrollableContent>
    </Box>
  )
}

export default ScrollableBox
