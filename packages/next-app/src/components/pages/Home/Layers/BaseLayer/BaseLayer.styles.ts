import { css } from '@emotion/css'
import { mq } from '../../../../../baseStyles'

export const root = css`
  overflow: hidden;
  pointer-events: none;
`

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
    padding: 100px 0;  
  }


  ${mq.lg} {
    padding: 100px;
    flex-direction: row;
  }

`
