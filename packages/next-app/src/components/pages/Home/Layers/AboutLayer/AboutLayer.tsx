import React from 'react'
import ThreeCSSObject from '@psycholog-studio/ui/ThreeGraphic/ThreeCSSLayer/ThreeCSSObject'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import { cx } from '@emotion/css'
import * as styles from './AboutLayer.styles'
import SkillBox from './SkillBox'
import useLayerCSSObjectRef from '../useLayerCSSObjectRef'

export interface HomeLayerProps {
  hide?: boolean
}

const AboutLayer = (props: HomeLayerProps): JSX.Element => {
  const { hide = true } = props
  const [, aboutLayerRefCallback] = useLayerCSSObjectRef()

  return (
    <ThreeCSSObject className={styles.root} ref={aboutLayerRefCallback}>
      <div className={cx(styles.content, { hide })}>
        <div className={styles.leftBlock}>
          <MessageBox className={cx(styles.leadRoleBox, { hide })}>
            {'Tokileecy'}
          </MessageBox>
          <MessageBox className={cx(styles.recentlyBox, { hide })}>
            <span>
              {
                '畢業於國立中山大學應用數學系，因緣際會下踏入前端領域，曾維護過 Vue.js、Asp.Net、Unity C# 的專案，而目前工作上主要使用使用 Storybook、Lerna、Emotion 等前端的工具配合 React 進行開發。'
              }
              <p />
              {`目前正關注 Design System 相關的技術與知識，並持續觀察 WebAssembly 與 Deno 等技術的發展進行學習中。`}
            </span>
          </MessageBox>
        </div>
        <div className={cx(styles.rightBlock, { hide })}>
          <SkillBox className={cx(styles.skillBox, { hide })} />
        </div>
      </div>
    </ThreeCSSObject>
  )
}

export default AboutLayer
