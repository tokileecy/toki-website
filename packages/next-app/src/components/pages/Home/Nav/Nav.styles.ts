import { css } from '@emotion/css'

export const current = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  z-index: 10;
  font-size: 36px;
`

export const list = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
`

export const nav = css`
  height: 70px;
  position: relative;
  overflow: hidden;
`

export const hide = css`
  opacity: 0;
  pointer-events: none;
`

export const show = css`
  opacity: 1;
`

export const content = css`
  display: flex;
  position: relative;
  height: 100%;

  &.mode-default {
    &:not(:hover) {
      .current {
        ${show}
      }

      .list {
        ${hide}
      }
    }
    &:hover {
      .current {
        ${hide}
      }
      .list {
        ${show}
      }
    }
  }

  &.mode-current {
    .current {
      ${show}
    }

    .list {
      ${hide}
    }
  }

  &.mode-list {
    .current {
      ${hide}
    }

    .list {
      ${show}
    }
  }
`
