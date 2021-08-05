import React, {
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import { cx, css, keyframes } from '@emotion/css'

const whiteBackground = keyframes`
  0% {
    background-color: #f1f1f1;
  }

  99.9% {
    background-color: #f1f1f1;
  }
  100% {
    background-color: none;
  }
`

const blink = keyframes`
  50% { opacity: 0; }
`

const cssRoot = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  /* background-color: rgba(1, 1, 1, 0.25); */
  /* border: white 2px solid; */
  font-size: 30px;
  font-weight: bold;
  color: #2b2b2b;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
  transform: translateX(0);
  transition: transform 0.5s;

  /* &.blink {
    animation: ${blink} 1s linear 2, ${whiteBackground} 2s linear 1;
    animation-fill-mode: backwards;
  } */
`

const cssHeader = css`
  background-color: rgba(0, 255, 255, 0.95);
  width: 40%;
  /* font-size: 32px; */
  height: 15px;
  margin-bottom: 10px;
  transition: transform 1s;
  transform-origin: left;

  &.expanded {
    transform: scaleX(1);
  }

  &.collapsed {
    transform: scaleX(0);
  }
`

const cssContent = css`
  &.show {
    visibility: visible;
  }

  &.hide {
    visibility: hidden;
  }
`

const cssContentContainer = css`
  padding: 10px;
  background-color: rgba(0, 255, 255, 0.95);
  transition: transform 1s;
  transform-origin: left;

  &.expanded {
    transform: scaleX(1);
  }

  &.collapsed {
    transform: scaleX(0);
  }
`

const cssTitle = css`
  font-size: 30px;
`

export type DialogBoxRef = RefObject<{
  collapsed: () => void
  expanded: () => void
}>

export interface DialogBoxProps
  extends PropsWithChildren<Record<string, unknown>> {
  className?: string
  title?: string
}

const DialogBox = React.forwardRef<HTMLDivElement, DialogBoxProps>(
  (props: DialogBoxProps, ref): JSX.Element => {
    const { className = '', children, title = '', animated = false } = props

    const [expandHeader, setExpandHeader] = useState(false)
    const [expandContent, setExpandContent] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [blink, setBlink] = useState(true)

    useEffect(() => {
      if (animated === true) {
        // setBlink(true)
        setTimeout(() => {
          setExpandHeader(true)
          setTimeout(() => {
            setExpandContent(true)
            setTimeout(() => {
              setShowContent(true)
            }, 1000)
          }, 500)
        }, 0)
      } else {
        setExpandHeader(false)
        setExpandContent(false)
        setShowContent(false)
      }
    }, [animated])
    return (
      <div
        ref={ref}
        className={cx(
          cssRoot,
          {
            blink,
          },
          className
        )}
      >
        <div
          className={cx(cssHeader, {
            expanded: expandHeader,
            collapsed: !expandHeader,
          })}
        ></div>
        <div
          className={cx(cssContentContainer, {
            expanded: expandContent,
            collapsed: !expandContent,
          })}
        >
          <div
            className={cx(cssContent, {
              show: showContent,
              hide: !showContent,
            })}
          >
            <div className={cssTitle}>{title}</div>
            {children}
          </div>
        </div>
      </div>
    )
  }
)

DialogBox.displayName = 'DialogBox'

export default DialogBox
