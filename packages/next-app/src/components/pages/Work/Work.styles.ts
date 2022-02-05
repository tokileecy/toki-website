import { css } from '@emotion/css'
import { cssBaseBox } from '../../Layers/styles'
import { mq } from '../../../baseStyles'

export const layerContent = css`
  ${mq.md} {
    align-items: center;
    justify-content: center;
  }
`

export const leftBlock = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: none;

  ${mq.lg} {
    display: initial;
    padding: 180px 0;
  }
`

export const rightBlock = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  ${mq.md} {
    height: initial;
  }
`

export const workBlockBox = css`
  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(130vw);
  }

  ${mq.md} {
    height: initial;
  }

  ${mq.lg} {
    height: 450px;
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
