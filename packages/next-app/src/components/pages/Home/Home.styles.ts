import { css } from '@emotion/css'
import { mq } from '../../../baseStyles'

export const webglLayer = css`
  /* top: 4%;
  height: 92%; */

  ${mq.sm} {
    top: 12%;
    height: 76%;
    border: solid 2px rgba(255, 255, 255, 0.8);
    border-left: 0;
    border-right: 0;
  }
`

export const uiLayer = css`
  /* padding: 2% 0; */

  ${mq.sm} {
    padding: 6% 0;
  }
`

export const uiLayerWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
`

export const header = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
  font-weight: bold;
  background-color: rgba(10, 10, 10, 0.9);
  box-shadow: 0 0 20px 10px rgba(200, 255, 230, 0.07);
  border-radius: 3px;
  width: 100%;
  font-size: 24px;
  padding: 4px 24px;
  pointer-events: auto;

  ${mq.sm} {
    font-size: 42px;
    padding: 8px;
    width: 500px;
    /* height: 60px; */
    align-items: center;
    justify-content: center;
  }
`

export const footer = css`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(120, 160, 200, 0.9);
  transition: transform 1s;
  transform: translateY(0);

  &.hide {
    transform: translateY(100%);
  }

  ${mq.sm} {
    position: initial;
    background-color: initial;
    height: 70px;
    width: 100%;
    &.hide {
      transform: translateY(0);
    }
  }
`

export const pageLabel = css`
  ${mq.sm} {
  }
`

export const menu = css`
  transform: scaleX(0.9);
  font-weight: 600;
  font-size: 18px;

  ${mq.sm} {
    display: none;
  }
`

export const nav = css`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  top: 0;
  left: 0;
  z-index: 5;
  padding: 20px;

  ${mq.sm} {
    position: relative;
    flex-direction: row;
    top: initial;
    left: initial;
    height: 100%;
  }
`

export const navItem = css`
  flex-grow: 0;
  margin: 20px 0;
  ${mq.sm} {
    flex-grow: 1;
  }
`
