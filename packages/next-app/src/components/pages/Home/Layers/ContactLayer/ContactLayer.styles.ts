import { css } from '@emotion/css'
import { root, baseContent } from '../styles'

export { root }

export const content = css`
  ${baseContent};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
`

export const contactFieldset = css`
  padding: 20px 50px;
`
export const contactFormBox = css`
  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(130vw);
  }
`
