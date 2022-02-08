import React, { PropsWithChildren } from 'react'
import { cx, css } from '@emotion/css'
import * as styles from './Skill.styles'
import Color from 'color'
import { colors } from '../../../../../../../../styles/baseStyles'

export type SkillProps = PropsWithChildren<{
  name?: string
  score?: number
}>

const chartColor = Color(colors.primaryDefault)
const chartBackgroundColor = Color(colors.primaryDefault)
  .desaturate(0.3)
  .gray(0.2)

const Skill = (props: SkillProps): JSX.Element => {
  const { name = '', score = 1 } = props

  const cssRoot = css`
    ${styles.root};

    &::after {
      background-image: linear-gradient(
        90deg,
        ${chartColor.toString()} 0,
        ${chartColor.toString()} ${score * 100}%,
        ${chartBackgroundColor.toString()} ${score * 100}%,
        ${chartBackgroundColor.toString()} 100%
      );
    }
  `

  return (
    <div className={cssRoot}>
      <em>{name}</em>
    </div>
  )
}

export default Skill
