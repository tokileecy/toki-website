import { css } from '@emotion/css'
import { mq } from '../../../baseStyles'

export const uiLayer = css`
  ${mq.sm} {
    padding: 6% 0;
  }
`

export const webglLayer = css`
  ${mq.sm} {
    top: 12%;
    height: 76%;
    border: solid 2px rgba(255, 255, 255, 0.8);
    border-left: 0;
    border-right: 0;
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
  overflow: hidden;
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
  /* background-color: rgb(120, 160, 200, 0.9); */
  transition: transform 0.5s;
  transform: translateX(0);

  &.hide {
    transform: translateX(50%);
  }

  ${mq.sm} {
    height: 70px;
    width: 100%;

    &.hide {
      transform: translateX(0);
    }
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  z-index: 5;
  width: 40%;
  height: 120px;
  top: 0;
  left: 60%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: -5;
    /* background-color: rgb(120, 160, 200, 1); */
    background-color: rgba(10, 10, 10, 0.9);
  }

  ${mq.sm} {
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 0 60px;
    height: 100%;
    top: initial;
    left: initial;
  }
`

export const navItem = css`
  margin: 5px 0;
  width: 100px;
  font-size: 18px;

  ${mq.sm} {
    font-size: 30px;
    width: 250px;
  }
`
