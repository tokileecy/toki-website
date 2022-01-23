import { css } from '@emotion/css'
import { mq } from '../../../../baseStyles'

export const root = css`
  overflow: hidden;
  pointer-events: none;
`

export const baseContent = css`
  width: 100vw;
  height: 100vh;
  padding: 50px;
  pointer-events: auto;
  &.hide {
    pointer-events: none;
  }
`

export const cssBaseBox = css`
  width: 300px;

  /* ${mq.xs} {
    width: 400px;
  } */

  ${mq.sm} {
    width: 400px;
  }

  ${mq.md} {
    width: 500px;
  }
`
