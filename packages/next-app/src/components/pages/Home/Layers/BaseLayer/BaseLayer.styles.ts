import { css } from '@emotion/css'
import { mq } from '../../../../../baseStyles'

export const root = css`
  overflow: hidden;
  pointer-events: none;
`

const mobilePadding = 50

export const content = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: auto;
  padding: ${mobilePadding * 2}px 0;

  &.hide {
    pointer-events: none;
  }

  ${mq.lg} {
    padding: ${mobilePadding * 2}px;
  }

  ${mq.lg} {
    flex-direction: row;
  }
`
