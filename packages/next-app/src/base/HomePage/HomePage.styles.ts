import { css } from '@emotion/css'
import { mq } from '../../styles/baseStyles'

export const wrapper = css`
  z-index: 5;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  padding: 0 20px;

  overflow-y: auto;
  overflow-x: hidden;

  &.hide {
    pointer-events: none;
    user-select: none;
    z-index: -1000;
  }

  ${mq.xs} {
    padding: 0 50px;
  }

  ${mq.sm} {
    padding: 0;
    width: 500px;
  }

  ${mq.md} {
    margin: auto;
    width: 800px;
  }

  ${mq.lg} {
    margin: auto;
    width: 1000px;
  }

  ${mq.xl} {
    margin: auto;
    width: 1100px;
  }

  ${mq.xxl} {
    margin: auto;
    width: 100%;
    padding: 0 400px;
  }
`

export const layoutWrap = css`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
