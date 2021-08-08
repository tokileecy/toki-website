import React, { ForwardedRef, forwardRef } from 'react'
import { cx, css } from '@emotion/css'
import Corners from '../Corners'
import Color from 'color'

export type BoxProps = React.HTMLAttributes<HTMLDivElement>

const bgColor = new Color('#22b6db')

const cssBaseBox = css`
  position: relative;
  border: 1px solid ${bgColor.lighten(0.5).alpha(0.8).toString()};
  background-color: ${bgColor.alpha(0.4).toString()};
`

const Box = forwardRef(
  (inProps: BoxProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const { className, children, ...props } = inProps
    return (
      <div {...props} ref={ref} className={cx(cssBaseBox, className)}>
        <Corners />
        {children}
      </div>
    )
  }
)

Box.displayName = 'Box'

export default Box
