import { css } from '@emotion/css'
import Color from 'color'
import { colors } from '../../../styles/baseStyles'
const backgroundColor = new Color(colors.primaryDark)

export const root = css`
  /* position: relative; */
  border: 1px solid ${backgroundColor.lighten(0.5).alpha(0.8).toString()};
  background-color: ${backgroundColor.alpha(0.3).toString()};
`
