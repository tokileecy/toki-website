import { css } from '@/styles/cssInstance'
import Color from 'color'
import { mq, fontSizes, colors } from '@/styles/baseStyles'
export const verticlePaddingPercentageMd = 4
export const verticlePaddingPercentageLg = 7
export const verticlePaddingPercentageXl = 10

export const root = css`
  background-color: ${Color(colors.black1000).toString()};
`

export const link = css`
  text-decoration: none;
  color: white;
  user-select: none;

  &.disable {
    cursor: not-allowed;
    pointer-events: none;
  }

  ${mq.md} {
    display: none;
  }
`

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
    top: ${verticlePaddingPercentageMd}%;
    height: ${100 - 2 * verticlePaddingPercentageMd}%;
    border-left: 0;
    border-right: 0;
  }

  ${mq.lg} {
    top: ${verticlePaddingPercentageLg}%;
    height: ${100 - 2 * verticlePaddingPercentageLg}%;
    border-left: 0;
    border-right: 0;
  }

  ${mq.xl} {
    top: ${verticlePaddingPercentageXl}%;
    height: ${100 - 2 * verticlePaddingPercentageXl}%;
    border-left: 0;
    border-right: 0;
  }
`

export const uiLayerWrapper = css`
  position: relative;
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
  background-color: rgba(10, 10, 10, 0.75);
  box-shadow: 0 0 20px 10px rgba(200, 255, 230, 0.1);
  border-radius: 3px;
  width: 100%;
  font-size: 20px;
  padding: 8px 24px;
  pointer-events: auto;
  transition: none;

  h1 {
    user-select: none;
    font-size: 18px;
  }

  @media screen and (min-width: 960px) {
    h1 {
      font-size: 36px;
    }
  }

  @media screen and (min-width: 1280px) {
    h1 {
      font-size: 56px;
    }
  }

  ${mq.md} {
    height: 32px;
    padding: 0 16px;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    height: 1.2em;
    width: 700px;
    min-width: 350px;
    margin-top: 8px;
    justify-content: space-between;
    transform: translateY(-100px);

    &.show {
      transition: transform 1s;
      transform: translateY(0);
    }

    &.hide {
      transition: transform 1s;
      transform: translateY(-100px);
    }

    &::before {
      height: 100%;
      content: '[';
    }

    &::after {
      height: 100%;
      content: ']';
    }
  }

  ${mq.lg} {
    width: 500px;
    font-size: ${fontSizes.h1}px;
  }

  ${mq.xl} {
    width: 500px;
  }
`

export const siteTitle = css`
  cursor: pointer;
  font-size: 24px;
  ${mq.md} {
    display: none;
  }
`

export const main = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  pointer-events: auto;
  padding: 20px 0;
`

export const footer = css`
  position: absolute;
  z-index: 5;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 40px;
  transition: transform 1s;
  pointer-events: none;
  transform: translateX(50%);

  &.show {
    transform: translateX(0);
  }

  ${mq.md} {
    position: relative;
    pointer-events: auto;
    padding-top: 0;
    height: 40px;
    width: 100%;
    transform: translateY(100px);

    &.hide {
      transform: translateX(0);
    }

    &.hide2 {
      transition: transform 1s;
      transform: translateY(100px);
    }

    &.show2 {
      transition: transform 1s;
      transform: translateY(0);
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
  color: white;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  ${mq.md} {
    display: none;
  }
`

export const nav = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
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
    background-color: ${Color(colors.black1000).alpha(0.9).toString()};
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

    &::after {
      content: none;
    }
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
    font-size: 24px;
    width: 200px;
  }

  ${mq.lg} {
    font-size: 28px;
    width: 250px;
    height: 30px;
  }

  ${mq.xl} {
    font-size: 32px;
    width: 300px;
    height: 40px;
  }

  ${mq.xxl} {
    font-size: 36px;
    width: 320px;
    height: 42px;
  }
`
