import React from 'react'
import { cx, css } from '@emotion/css'
import Color from 'color'

export type ScrollableContentProps = React.HTMLAttributes<HTMLDivElement>

const scrollBarColor = new Color('#ffffff').alpha(0.7).toString()
const textareaHorizonPadding = 0.4
const scrollBarPadding = 0.3

const cssCrollBarStyle = css`
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${scrollBarColor};
  }

  @-moz-document url-prefix() {
    padding: 0 0 0 ${textareaHorizonPadding + scrollBarPadding}ch;
    scrollbar-color: ${scrollBarColor} transparent;
    scrollbar-width: thin;
  }
`

export const cssScrollableStyle = css`
  padding: 0 ${scrollBarPadding}ch 0
    ${textareaHorizonPadding + scrollBarPadding}ch;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: transparent;
  text-shadow: 0 0 0 #fff;
  resize: none;
  overflow: auto;
  line-break: anywhere;

  ${cssCrollBarStyle};
`

export const ScrollableContent = (
  inProps: ScrollableContentProps
): JSX.Element => {
  const { className, ...props } = inProps
  return <div {...props} className={cx(cssScrollableStyle, className)}></div>
}

export default ScrollableContent
