import { css } from '@/styles/cssInstance'
import { mq } from '@/styles/baseStyles'

export const layerContent = css`
  ${mq.md} {
    align-items: center;
    justify-content: center;
  }
`

export const leftBlock = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: none;

  ${mq.lg} {
    display: initial;
    padding: 180px 0;
  }
`

export const rightBlock = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  ${mq.md} {
    height: initial;
  }
`

export const workBlockBox = css`
  width: 100%;
  transform: translateX(130vw);
  transition: none;

  &.show {
    transition: transform 1s;
    transform: translateX(0);
  }

  &.hide {
    transition: transform 1s;
    transform: translateX(130vw);
  }

  ${mq.md} {
    max-height: initial;
  }

  ${mq.lg} {
    max-height: 450px;
  }

  ${mq.xl} {
    max-height: 600px;
  }
`

export const descriptionBox = css`
  min-height: 100px;
  padding: 20px;
  transform: translateX(-130vw);
  transition: none;

  &.show {
    transition: transform 1s;
    transform: translateX(0);
  }

  &.hide {
    transition: transform 1s;
    transform: translateX(-130vw);
  }
`
