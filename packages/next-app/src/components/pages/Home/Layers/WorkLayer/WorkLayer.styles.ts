import { css } from '@emotion/css'
import { baseRoot, cssBaseBox } from '../styles'

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
  justify-content: space-between;
`

export const workBlockBox = css`
  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(100vw);
  }
`

export const leftBlock = css`
  padding: 180px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const rightBlock = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const descriptionBox = css`
  min-height: 100px;
  padding: 20px;
  ${cssBaseBox};

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-100vw);
  }
`
