import { css } from '@emotion/css'
import { baseRoot } from '../styles'

export const root = css`
  &.hide {
    pointer-events: none;
  }
`

export const content = css`
  ${baseRoot};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const contactFieldset = css`
  padding: 20px 50px;
`
export const contactFormBox = css`
  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(100vw);
  }
`
