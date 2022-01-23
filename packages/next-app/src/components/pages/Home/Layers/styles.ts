import { css } from '@emotion/css'
import { mq } from '../../../../baseStyles'

export const baseRoot = css`
  width: 100vw;
  height: 100vh;
  padding: 50px;
`

export const cssBaseBox = css`
  ${mq.xxs} {
    width: 400px;
  }

  ${mq.sm} {
    width: 500px;
  }
`
