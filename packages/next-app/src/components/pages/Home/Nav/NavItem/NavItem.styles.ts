import { css } from '@emotion/css'
import Color from 'color'

// const cssAfter = css`
//     content: '';
//     position: absolute;
//     z-index: -5;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(30, 30, 30, 0.2);
//     box-shadow: 0 0 20px 10px rgba(200, 255, 230, 0.03);
//     filter: blur(3px) drop-shadow(0 0px 2px #830db6);

// `

export const link = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
`

const bgColor = new Color('#ff7e7c').alpha(0.75)
const bgColor1 = new Color('#c5c5c5').alpha(0.75)
const bgColor3 = new Color('#26c9f2').alpha(0.8)
// const bgColor4 = new Color('#edd100').alpha(0.75)
const bgColor2 = new Color('#343434')

const createBefore = (color1: Color, color2: Color) => {
  return css`
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -3;
    background-size: 15px 15px;
    background-image: linear-gradient(
      -45deg,
      ${color1.toString()} 0,
      ${color1.toString()} 15%,
      ${color2.alpha(0.05).toString()} 0,
      ${color2.alpha(0.05).toString()} 50%,
      ${color1.toString()} 0,
      ${color1.toString()} 65%,
      ${color2.alpha(0.05).toString()} 0,
      ${color2.alpha(0.05).toString()} 100%
    );
    background-color: transparent;
  `
}

const cssAfter = css`
  content: '';
  position: absolute;
  z-index: -5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 10, 10, 0.8);
  box-shadow: 0 0 20px 10px rgba(200, 255, 230, 0.1);
  /* filter: blur(3px) drop-shadow(0 0px 2px #830db6); */
`

export const text = css`
  padding: 0 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
  border-radius: 3px;
  position: relative;

  &::before {
    transition: background-image 0.2s ease-in-out;
    ${createBefore(bgColor1, bgColor2)}
  }

  &::after {
    ${cssAfter}
  }

  &:hover {
    &::before {
      ${createBefore(bgColor, bgColor2)}
    }
  }

  &.selected {
    &::before {
      ${createBefore(bgColor3, bgColor2)}
    }
  }
`
