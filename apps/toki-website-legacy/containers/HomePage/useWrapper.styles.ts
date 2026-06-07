import { css } from '@/styles/cssInstance'
import { mq } from '@/styles/baseStyles'

export const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 5;
  position: absolute;
  height: 100%;
  width: 100%;
  margin: auto;

  overflow-y: auto;
  overflow-x: hidden;

  &.hide {
    pointer-events: none;
    user-select: none;
    z-index: -1000;
  }
`

export const content = css`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  width: 300px;
  padding: 0;

  ${mq.sm} {
    width: 500px;
  }

  ${mq.md} {
    width: 800px;
  }

  ${mq.lg} {
    width: 1000px;
  }

  ${mq.xl} {
    width: 1100px;
  }

  ${mq.xxl} {
    width: 100%;
    padding: 0 400px;
  }
`
