import React, { RefObject, useImperativeHandle, useRef, useState } from 'react'
import { cx, css } from '@emotion/css'
import Box, { BoxProps } from '../Box'
import Color from 'color'

const cssRoot = css`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: rgba(1, 1, 1, 0.25); */
  /* border: 1px solid ${new Color('#111111')
    .lighten(0.5)
    .alpha(0.8)
    .toString()}; */
  background-color: ${new Color('#111111').alpha(0.15).toString()};
  /* border: white 1px solid; */
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 7px rgba(0, 255, 255, 0.6);
  transform: translateX(0);
  transition: transform 0.5s;

  &.collapsed {
    transform: translateX(-100%);
  }
`

export type MessageBoxRef = RefObject<{
  collapse: () => void
  expand: () => void
}>

export type MessageBoxProps = BoxProps

const MessageBox = React.forwardRef(
  (inProps: MessageBoxProps, ref): JSX.Element => {
    const { className, ...props } = inProps
    const [collapsed, setCollapsed] = useState(false)
    const rootRef = useRef(null)

    useImperativeHandle(ref, () => ({
      collapse: () => {
        setCollapsed(true)
      },
      expand: () => {
        setCollapsed(false)
      },
    }))

    return (
      <Box
        {...props}
        ref={rootRef}
        className={cx(
          cssRoot,
          {
            collapsed,
          },
          className
        )}
      />
    )
  }
)

MessageBox.displayName = 'MessageBox'

export default MessageBox
