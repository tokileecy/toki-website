import { css } from '@emotion/css'
import { mq } from '../../../../../baseStyles'

export const topBlock = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px;

  ${mq.md} {
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

export const bottomBlock = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 50px;

  ${mq.md} {
    height: 100%;
    align-items: flex-end;
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
