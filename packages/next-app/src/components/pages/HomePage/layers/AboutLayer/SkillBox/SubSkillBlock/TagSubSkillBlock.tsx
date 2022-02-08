import React, { PropsWithChildren } from 'react'
import { css } from '@emotion/css'
import Color from 'color'

const bgColor = new Color(0x00ffff)

const cssRoot = css`
  width: 100%;
`

const cssHeader = css`
  background-color: ${bgColor.rgb().toString()};
  width: 100%;
  height: 2px;
`

const paddingRight = 10

const cssTitle = css`
  padding: ${paddingRight}px;
  color: white;
  width: 100%;
  min-height: 20px;
  font-size: 32px;
  font-weight: bold;
`

const cssContent = css`
  padding: ${paddingRight}px;
  color: white;
  padding-right: 0;
  min-height: 100px;
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  flex-wrap: wrap;
`

const cssSkill = css`
  background-color: ${bgColor.darken(0.1).toString()};
  color: #0b0b0b;
  font-weight: bold;
  margin: 5px;
  padding: 0 5px;
  font-size: 14px;
  border-radius: 2px;
  line-height: 1rem;
  text-align: center;
  margin: 0 5px 10px 0;
  padding: 3px 5px;
  white-space: nowrap;
`

export type TagSubSkillBlockSkill = string

export type TagSubSkillBlockProps = PropsWithChildren<{
  title?: string
  skills?: TagSubSkillBlockSkill[]
}>

const TagSubSkillBlock = (props: TagSubSkillBlockProps): JSX.Element => {
  const { title = '', skills = [] } = props
  return (
    <div className={cssRoot}>
      <div className={cssTitle}>{title}</div>
      <div className={cssHeader}></div>
      <div className={cssContent}>
        {skills.map((skill) => {
          return (
            <span key={skill} className={cssSkill}>
              {skill}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default TagSubSkillBlock
