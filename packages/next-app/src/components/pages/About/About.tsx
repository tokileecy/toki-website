import React from 'react'
import { cx } from '@emotion/css'
import * as styles from './About.styles'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import SkillBox from './SkillBox'
import { BasePageProps } from '../types'

const About = (props: BasePageProps): JSX.Element => {
  const { hide } = props

  return (
    <div className={styles.root}>
      <div className={styles.leftBlock}>
        <MessageBox className={cx(styles.leadRoleBox, { hide })}>
          {'Tokileecy'}
        </MessageBox>
        <MessageBox className={cx(styles.recentlyBox, { hide })}>
          <span>
            <p>
              {
                '畢業於國立中山大學應用數學系，因緣際會下踏入前端領域，曾維護過 Vue.js、Asp.Net、Unity C# 的專案，而目前工作上主要使用使用 Storybook、Lerna、Emotion 等前端的工具配合 React 進行開發。'
              }
            </p>
            <p>
              {`目前正關注 Design System 相關的技術與知識，並持續觀察 WebAssembly 與 Deno 等技術的發展進行學習中。`}
            </p>
          </span>
        </MessageBox>
      </div>
      <div className={cx(styles.rightBlock, { hide })}>
        <SkillBox
          classes={{
            root: cx(styles.skillBox, { hide }),
            scrollableContent: styles.skillBoxContent,
          }}
        />
      </div>
    </div>
  )
}

export default About
