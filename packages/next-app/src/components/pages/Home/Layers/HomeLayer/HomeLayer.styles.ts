import { css } from '@emotion/css'
import { root, baseContent } from '../styles'
import { mq } from '../../../../../baseStyles'
export { root }

export const content = css`
  ${baseContent};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 100px 0;
  overflow-y: auto;
  overflow-x: hidden;

  ${mq.md} {
    padding: 100px;
    justify-content: space-between;
  }

  ${mq.lg} {
    padding: 200px;
    justify-content: space-between;
  }
`

export const topBlock = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${mq.lg} {
    justify-content: flex-start;
  }
`

export const bottomBlock = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${mq.lg} {
    justify-content: flex-end;
  }
`

export const grettingBox = css`
  width: 250px;
  height: 150px;

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-130vw);
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
    transform: translateX(130vw);
  }
`

export const developing = css`
  padding-top: 10px;
`

export const spriteBox = css`
  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-130vw);
  }
`
