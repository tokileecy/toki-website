import React, {
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
  PropsWithChildren,
} from 'react'
import { cx, css } from '@emotion/css'

const cssRoot = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(1, 1, 1, 0.25);
  border: white 1px solid;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
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

export interface MessageBoxProps
  extends PropsWithChildren<Record<string, unknown>> {
  className: string
}

const MessageBox = React.forwardRef(
  (props: MessageBoxProps, ref): JSX.Element => {
    const { className, children } = props
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
      <div
        ref={rootRef}
        className={cx(
          cssRoot,
          {
            collapsed,
          },
          className
        )}
      >
        {children}
      </div>
    )
  }
)

MessageBox.displayName = 'MessageBox'

export default MessageBox
