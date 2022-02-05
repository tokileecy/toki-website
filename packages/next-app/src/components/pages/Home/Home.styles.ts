import { css } from '@emotion/css'
import Color from 'color'
import { colors } from '../../../baseStyles'

export const content = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: white;
`

export const greeting = css`
  padding-left: 180px;
  padding-right: 180px;

  transition: transform 1s;
  transform: translateX(0);
  &.hide {
    transform: translateX(-130vw);
  }
`

export const h2 = css`
  font-size: 128px;
  text-shadow: 0 0 1em ${Color(colors.primaryTint).alpha(0.55).toString()};
  color: ${Color(colors.black100).toString()};
  font-weight: bold;
  line-height: 1.2em;
`

export const h3 = css`
  font-size: 48px;
  text-shadow: 0 0 1em ${Color(colors.primaryTint).alpha(0.55).toString()};
  color: ${Color(colors.black100).toString()};
  font-weight: bold;
  line-height: 1.2em;
`

export const buttonWrap = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 96px;
  padding-right: 180px;
  transition: transform 1s;
  transform: translateX(0);

  &.hide {
    transform: translateX(130vw);
  }
`

export const button = css`
  width: 460px;
  height: 100px;
  font-size: 64px;
  font-weight: bold;
  border-radius: 4px;

  color: ${Color(colors.black100).toString()};
`
