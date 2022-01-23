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

export const leadRoleBox = css`
  width: 100%;
  padding: 10px;

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-100vw);
  }
`

export const recentlyBox = css`
  padding: 20px;
  ${cssBaseBox};

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-100vw);
  }
`

export const skillBox = css`
  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(100vw);
  }
`

export const leftBlock = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const rightBlock = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
