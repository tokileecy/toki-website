import React from 'react'
import { cx } from '@/styles/cssInstance'
import * as styles from './AboutLayer.styles'
import MessageBox from '@psycholog-studio/ui/Containers/MessageBox'
import SkillBox from './SkillBox'
import { BasePageProps } from '../types'
import { SkillCategory } from '@/utils/baseTypes'
import xss from 'xss'

export interface AboutLayerProps extends BasePageProps {
  skillCategories: SkillCategory[]
  name: string
  description: string
}

const AboutLayer = (props: AboutLayerProps): JSX.Element => {
  const { show, name, description, skillCategories } = props

  return (
    <div className={styles.root}>
      <div className={styles.leftBlock}>
        <MessageBox
          className={cx(styles.leadRoleBox, { show, hide: show === false })}
        >
          {name}
        </MessageBox>
        <MessageBox
          className={cx(styles.recentlyBox, { show, hide: show === false })}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: xss(description),
            }}
          ></span>
        </MessageBox>
      </div>
      <div className={styles.rightBlock}>
        <SkillBox
          skillCategories={skillCategories}
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
