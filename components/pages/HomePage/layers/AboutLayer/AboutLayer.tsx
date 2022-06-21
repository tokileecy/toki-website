import React from 'react'
import { cx } from '@emotion/css'
import * as styles from './AboutLayer.styles'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import SkillBox from './SkillBox'
import { BasePageProps } from '../types'

const AboutLayer = (props: BasePageProps): JSX.Element => {
  const { show } = props

  return (
    <div className={styles.root}>
      <div className={styles.leftBlock}>
        <MessageBox
          className={cx(styles.leadRoleBox, { show, hide: show === false })}
        >
          {'Tokileecy'}
        </MessageBox>
        <MessageBox
          className={cx(styles.recentlyBox, { show, hide: show === false })}
        >
          <span>
            <p>
              {
                '畢業於中山大學應用數學系，曾維護過 Unity 與 ASP.Net Core 專案，在期間接觸了 Node.js 與前端相關技術，進而持續修習 Web Component 、 WebGL、Electron 等前端相關技術。目前工作上主要使用 React 與 Emotion 進行開發。'
              }
            </p>
            <p>
              {`目前正關注建構 Design System 的相關技術與知識，並對於任何前端的技術抱有熱忱也持續精進中。`}
            </p>
          </span>
        </MessageBox>
      </div>
      <div className={styles.rightBlock}>
        <SkillBox
          classes={{
            root: cx(styles.skillBox, { show, hide: show === false }),
            scrollableContent: styles.skillBoxContent,
          }}
        />
      </div>
    </div>
  )
}

export default AboutLayer
