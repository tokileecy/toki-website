import { css } from '@emotion/css'
import { mq } from '../../../baseStyles'

export const uiLayer = css`
  ${mq.md} {
    padding: 2% 0;
  }

  ${mq.lg} {
    padding: 3.5% 0;
  }
  ${mq.xl} {
    padding: 5% 0;
  }
`

export const webglLayer = css`
  ${mq.md} {
    top: 4%;
    height: 92%;
    border: solid 2px rgba(255, 255, 255, 0.8);
    border-left: 0;
    border-right: 0;
  }

  ${mq.lg} {
    top: 7%;
    height: 86%;
    border: solid 2px rgba(255, 255, 255, 0.8);
    border-left: 0;
    border-right: 0;
  }

  ${mq.xl} {
    top: 10%;
    height: 80%;
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
  font-size: 20px;
  padding: 4px 24px;
  pointer-events: auto;

  ${mq.sm} {
    height: 36px;
  }

  ${mq.md} {
    padding: 0;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    height: 34px;
    width: 350px;
  }

  ${mq.lg} {
    font-size: 32px;
    height: 42px;
    width: 500px;
  }

  ${mq.xl} {
    font-size: 36px;
    height: 50px;
    width: 500px;
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

  ${mq.md} {
    height: 40px;
    width: 100%;

    &.hide {
      transform: translateX(0);
    }
  }

  ${mq.lg} {
    height: 50px;
  }

  ${mq.xl} {
    height: 60px;
  }
`

export const menu = css`
  transform: scaleX(0.9);
  font-weight: 600;
  font-size: 18px;

  ${mq.md} {
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

  ${mq.md} {
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
  font-size: 16px;

  ${mq.sm} {
    width: 150px;
  }

  ${mq.md} {
    font-size: 20px;
    width: 200px;
  }

  ${mq.lg} {
    font-size: 24px;
    width: 250px;
  }

  ${mq.xl} {
    font-size: 28px;
    width: 300px;
  }
`
