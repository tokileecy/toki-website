import { css } from '@emotion/css'
import { mq } from '../../../baseStyles'
import {
  verticlePaddingPercentageMd,
  verticlePaddingPercentageLg,
  verticlePaddingPercentageXl,
} from '../../pages/Home/Home.styles'
export const root = css`
  overflow: hidden;
  pointer-events: none;
`

export const layerHeight = css`
  ${mq.md} {
    height: ${100 - 2 * verticlePaddingPercentageMd}vh;
  }

  ${mq.lg} {
    height: ${100 - 2 * verticlePaddingPercentageLg}vh;
  }

  ${mq.xl} {
    height: ${100 - 2 * verticlePaddingPercentageXl}vh;
  }
`

const verticlePadding = 100
export const content = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y; ;
  overflow-x: hidden;
  pointer-events: auto;
  padding: 40px 0;

  &.hide {
    pointer-events: none;
  }
  
  ${mq.sm} {
    padding: ${verticlePadding}px 0;  
  }

  /* ${mq.md} {
    height: calc(100vh - ${verticlePaddingPercentageMd}%);
  } */


  ${mq.lg} {
    padding: ${verticlePadding}px;
    /* height: calc(100vh - ${verticlePaddingPercentageLg}%); */
    flex-direction: row;
  }

  /* ${mq.lg} {
    height: calc(100vh - ${verticlePaddingPercentageXl}%);
  } */

  ${layerHeight};
`
