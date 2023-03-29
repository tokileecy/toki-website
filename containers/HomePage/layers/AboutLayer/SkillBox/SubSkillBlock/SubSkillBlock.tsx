import React, { PropsWithChildren } from 'react'
import * as styles from './SubSkillBlock.styles'
import Skill from './Skill'

export type SubSkillBlockSkill = {
  name: string
  value: number
}

export type SubSkillBlockProps = PropsWithChildren<{
  title?: string
  description?: string
  skills?: SubSkillBlockSkill[]
  minWidth?: string
}>

const SubSkillBlock = (props: SubSkillBlockProps): JSX.Element => {
  const { title = '', description = '', skills = [] } = props
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <div className={styles.description}>{description}</div>
        <div className={styles.skills}>
          {skills.map((skill) => {
            let value = skill.value ?? 1
            if (value > 1) {
              value = 1
            } else if (value < 0) {
              value = 0
            }
            return <Skill key={skill.name} name={skill.name} score={value} />
          })}
        </div>
      </div>
    </div>
  )
}

export default SubSkillBlock
