import { css } from '@emotion/css'
import { cssBaseBox } from '../styles'
import { mq } from '../../../../../baseStyles'

export const leftBlock = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mq.lg} {
    padding: 180px 0;
  }
`

export const rightBlock = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const workBlockBox = css`
  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(130vw);
  }
`

export const descriptionBox = css`
  min-height: 100px;
  padding: 20px;
  ${cssBaseBox};

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-130vw);
  }
`
