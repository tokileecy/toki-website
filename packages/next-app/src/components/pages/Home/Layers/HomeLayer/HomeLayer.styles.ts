import { css } from '@emotion/css'
import { mq } from '../../../../../baseStyles'

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

// export const spriteBox = css`
//   transition: transform 1s;
//   transform: translateX(0);
//   &.hide {
//     transform: translateX(-130vw);
//   }
// `
