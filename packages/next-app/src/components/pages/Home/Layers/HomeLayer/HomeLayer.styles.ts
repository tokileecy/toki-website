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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const topBlock = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

export const bottomBlock = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const grettingBox = css`
  width: 250px;
  height: 150px;

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-100vw);
  }
`

export const descriptionBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 150px;

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(100vw);
  }
`

export const developing = css`
  padding-top: 10px;
`

export const spriteBox = css`
  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-100vw);
  }
`
