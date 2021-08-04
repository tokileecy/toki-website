import React, { PropsWithChildren } from 'react'
import { css } from '@emotion/css'

const cssRoot = css`
  width: 100%;
`

const cssHeader = css`
  background-color: black;
  width: 100%;
  height: 15px;
`

const paddingRight = 10
const cssTitle = css`
  padding: ${paddingRight}px;
  color: black;
  width: 100%;
  min-height: 20px;
  font-size: 32px;
  font-weight: bold;
`

const cssContent = css`
  padding: ${paddingRight}px;
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

const cssSkill = css`
  display: flex;
`

export type SubSkillBlockProps = PropsWithChildren<{
  title?: string
  description?: string
  skills?: string[]
}>

const SubSkillBlock = (props: SubSkillBlockProps): JSX.Element => {
  const { title = '', description = '', skills = [] } = props
  return (
    <div className={cssRoot}>
      <div className={cssTitle}>{title}</div>
      <div className={cssHeader}></div>
      <div className={cssContent}>
        <div className={cssDescription}>{description}</div>
        <div className={cssSkill}>
          {skills.map((skill) => {
            return (
              <div
                key={skill}
                className={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding-right: 10px;

                  &:last-child {
                    padding-right: 0;
                  }
                `}
              >
                <div
                  className={css`
                    width: 30px;
                    background-color: black;
                    height: 70px;
                  `}
                ></div>
                <div
                  className={css`
                    font-size: 12px;
                    line-break: anywhere;
                  `}
                >
                  {skill}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SubSkillBlock
