import { css } from '@emotion/css'

export const navContainer = css`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
`

export const nav = css`
  pointer-events: auto;
`
