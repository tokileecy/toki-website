import { css } from '@emotion/css'
import { mq } from '../../../../baseStyles'

export const cssBaseBox = css`
  width: 300px;

  ${mq.sm} {
    width: 400px;
  }

  ${mq.md} {
    width: 500px;
  }
`
