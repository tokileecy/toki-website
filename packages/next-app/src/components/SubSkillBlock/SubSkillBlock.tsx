import React, { PropsWithChildren } from 'react'
import { cx, css } from '@emotion/css'
import Color from 'color'
import { mq } from '../../baseStyles'

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
  align-items: flex-start;

  ${mq.xxs} {
    flex-direction: column;
  }

  ${mq.sm} {
    flex-direction: row;
  }
`

const cssDescription = css`
  flex-grow: 1;
  overflow: hidden;
  line-break: anywhere;
  font-size: 14px;
  font-weight: normal;
  padding-right: 10px;
  /* max-width: 60%; */
`

const cssSkills = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`

const cssSkill = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 5px;

  &:last-child {
    padding-right: 0;
  }
`

const chartMaxHeight = 70

const cssSkillChart = css`
  width: 20px;
  margin: 0 8px;
  background-color: ${bgColor.toString()};
  height: ${chartMaxHeight}px;
`

const cssSkillName = css`
  font-size: 12px;
  line-break: anywhere;
  color: white;
  white-space: nowrap;
`

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
  const { title = '', description = '', skills = [], minWidth = '' } = props
  return (
    <div className={cssRoot}>
      <div className={cssTitle}>{title}</div>
      <div className={cssHeader}></div>
      <div className={cssContent}>
        <div className={cssDescription}>{description}</div>
        <div
          className={cx(
            cssSkills,
            css`
              min-width: ${minWidth};
            `
          )}
        >
          {skills.map((skill) => {
            let value = skill.value ?? 1
            if (value > 1) {
              value = 1
            } else if (value < 0) {
              value = 0
            }
            return (
              <div key={skill.name} className={cssSkill}>
                <div className={cssSkillName}>{value * 100}%</div>
                <div
                  style={{
                    height: `${chartMaxHeight * value}px`,
                  }}
                  className={cssSkillChart}
                ></div>
                <div className={cssSkillName}>{skill.name}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SubSkillBlock
