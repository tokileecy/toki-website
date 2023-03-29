import React from 'react'
import { css } from '@emotion/css'
import ScrollableContent from '@/components/ScrollableContent'
import Box from '@/components/Box'
import { cx } from '@/styles/cssInstance'
import { mq } from '@/styles/baseStyles'
import { SkillCategory } from '@/lib/api'
import SubSkillBlock from './SubSkillBlock'
import TagSubSkillBlock from './SubSkillBlock/TagSubSkillBlock'
import * as styles from './SkillBox.styles'

export type SkillBoxClassesKey = 'root' | 'scrollableContent'
export type SkillBoxProps = {
  skillCategories: SkillCategory[]
  className?: string
  classes?: {
    [k in SkillBoxClassesKey]?: string
  }
}

const SkillBox = (props: SkillBoxProps): JSX.Element => {
  const { className, classes = {}, skillCategories } = props

  return (
    <Box className={cx(className, classes.root)}>
      <ScrollableContent
        style={{ padding: 0 }}
        className={cx(styles.scrollableContent, classes.scrollableContent)}
      >
        <div
          className={css`
            padding: 16px;

            ${mq.sm} {
              padding: 24px;
            }
          `}
        >
          <div className={styles.title}>{'SKILL'}</div>
          {skillCategories.map((skillCategory) => (
            <SubSkillBlock
              key={skillCategory.id}
              title={skillCategory.name}
              description={skillCategory.description}
              skills={skillCategory.skills.map((skill) => ({
                name: skill.name,
                value: skill.level / 100,
              }))}
            />
          ))}

          <TagSubSkillBlock
            skills={[
              'HTML5',
              'CSS3',
              'JavaScript',
              'ES6/ES5',
              'Typescript',
              'SCSS',
              'C#',
              'Npm',
              'Yarn',
              'Storybook',
              'Axios',
              'ESLint',
              'StyleLint',
              'Redux',
              'MobX',
              'Web Components',
              'Three.js',
              'Tween.js',
              'NodeJS',
              'ASP.NET Core',
              'Nginx',
              'Docker',
              'Json Schema',
              'Git',
              'GitLab',
            ]}
            title="Others"
          />
        </div>
      </ScrollableContent>
    </Box>
  )
}

export default SkillBox
