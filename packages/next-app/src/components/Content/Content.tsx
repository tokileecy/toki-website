import React, { PropsWithChildren } from 'react'
import { cx, css } from '@emotion/css'
import Color from 'color'

const bgColor = new Color('#c5c5c5')
const bgColor2 = new Color('#5c5c5c')
export type ContentProps = PropsWithChildren<{
  className?: string
}>

const cssBackgroundStyle = css`
  background-size: 30px 30px;
  background-image: linear-gradient(
    -45deg,
    ${bgColor.toString()} 0,
    ${bgColor.toString()} 15%,
    ${bgColor2.toString()} 0,
    ${bgColor2.toString()} 50%,
    ${bgColor.toString()} 0,
    ${bgColor.toString()} 65%,
    ${bgColor2.toString()} 0,
    ${bgColor2.toString()} 100%
  );
  background-color: transparent;
`

const cssRoot = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gery;
  position: relative;
  height: 500px;
  ${cssBackgroundStyle};
`

const fontColor = new Color('#3b3b3b')

const cssFontStyle = css`
  font-size: 80px;
  color: ${fontColor.toString()};
  font-weight: 700;
`

const Content = (props: ContentProps): JSX.Element => {
  const { children = 'Content', className } = props

  return (
    <div className={cx(cssRoot, className)}>
      <span className={cssFontStyle}>{children}</span>
    </div>
  )
}

export default Content
