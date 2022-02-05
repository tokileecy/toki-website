import { css } from '@emotion/css'

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
