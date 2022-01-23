import React from 'react'
import { css } from '@emotion/css'
import Color from 'color'

export type Page = 'home' | 'about' | 'work' | 'contact'

const ShadowBox = (): JSX.Element => {
  const hOffset = 0
  const vOffset = 150
  const blurRadius = 100
  const spreadRadius = -100
  const shdowColor = new Color('#000000').alpha(1).toString()

  return (
    <div
      className={css`
        pointer-events: none;
        width: 150%;
        height: 100%;
        position: absolute;
        z-index: 15;
        box-shadow: inset ${hOffset}px -${vOffset}px ${blurRadius}px ${spreadRadius}px
            ${shdowColor},
          inset ${hOffset}px ${vOffset}px ${blurRadius}px ${spreadRadius}px
            ${shdowColor};
      `}
    ></div>
  )
}

export default ShadowBox
