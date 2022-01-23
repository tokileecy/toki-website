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
  align-items: flex-start;
`

const cssDescription = css`
  overflow: hidden;
  line-break: anywhere;
  font-size: 12px;
  padding-right: 10px;
  /* max-width: 60%; */
`

const cssSkills = css`
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
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

  &:nth-child(even) {
    .text {
      top: 1rem;
    }
  }

  .text {
    position: absolute;
    white-space: nowrap;
    left: 50%;
    transform: translate(-50%, 0);
  }
`

export type SubSkillBlock1Skill = {
  name: string
  value: number
}

export type SubSkillBlock1Props = PropsWithChildren<{
  title?: string
  description?: string
  skills?: SubSkillBlock1Skill[]
}>

const SubSkillBlock1 = (props: SubSkillBlock1Props): JSX.Element => {
  const { title = '', description = '', skills = [] } = props
  return (
    <div className={cssRoot}>
      <div className={cssTitle}>{title}</div>
      <div className={cssHeader}></div>
      <div className={cssContent}>
        <div className={cssDescription}>{description}</div>
        <div className={cssSkills}>
          <div
            className={css`
              display: flex;
              align-items: flex-end;
            `}
          >
            {skills.map((skill) => {
              let value = skill.value ?? 1
              if (value > 1) {
                value = 1
              } else if (value < 0) {
                value = 0
              }
              return (
                <div
                  key={skill.name}
                  style={{
                    height: `${chartMaxHeight * value}px`,
                  }}
                  className={cssSkillChart}
                ></div>
              )
            })}
          </div>
          <div
            className={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            {skills.map((skill) => {
              let value = skill.value ?? 1
              if (value > 1) {
                value = 1
              } else if (value < 0) {
                value = 0
              }
              return (
                <div
                  key={skill.name}
                  className={css`
                    ${cssSkillName};
                    position: relative;
                    flex-grow: 1;
                  `}
                >
                  <div className="text">{skill.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubSkillBlock1
