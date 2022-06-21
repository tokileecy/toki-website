import { css } from '@emotion/css'
import Color from 'color'
import { colors } from '@/styles/baseStyles'
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
  background-color: rgba(10, 10, 10, 0.2);
  box-shadow: 0 0 20px 10px rgba(200, 255, 230, 0.1);
  /* filter: blur(3px) drop-shadow(0 0px 2px #830db6); */
`

const darkColor = new Color('#343434')

const baseButtonColor = Color(colors.primaryDark)
const normalButtonColor = baseButtonColor.darken(0.35)
const hoverButtonColor = baseButtonColor.darken(0.2)
const activeButtonColor = baseButtonColor

const baseSelectedColor = Color(colors.complementaryOrange)
const normalSelectedColor = baseSelectedColor
const hoverSelectedColor = baseSelectedColor
const activeSelectedColor = baseSelectedColor.lighten(0.1)

export const link = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* flex-grow: 1; */
  color: white;
  text-decoration: none;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  position: relative;

  &::before {
    transition: background-image 0.2s ease-in-out;
    ${createBefore(normalButtonColor, darkColor)}
  }

  &:hover {
    &::before {
      ${createBefore(hoverButtonColor, darkColor)}
    }
  }

  &:active {
    &::before {
      ${createBefore(activeButtonColor, darkColor)}
    }
  }

  &.selected {
    &::before {
      ${createBefore(normalSelectedColor, darkColor)}
    }

    &:hover::before {
      ${createBefore(hoverSelectedColor, darkColor)}
    }

    &:active::before {
      ${createBefore(activeSelectedColor, darkColor)}
    }
  }

  &::after {
    ${cssAfter}
  }
`
