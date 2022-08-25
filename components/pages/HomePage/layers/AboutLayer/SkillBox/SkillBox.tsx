import React from 'react'
import ScrollableContent from '../../../../../base/ScrollableContent'
import Box from '../../../../../base/Box'
import SubSkillBlock from './SubSkillBlock'
import TagSubSkillBlock from './SubSkillBlock/TagSubSkillBlock'
import * as styles from './SkillBox.styles'
import { cx } from '@/styles/cssInstance'
import { css } from '@emotion/css'
import { mq } from '@/styles/baseStyles'

export type SkillBoxClassesKey = 'root' | 'scrollableContent'
export type SkillBoxProps = {
  className?: string
  classes?: {
    [k in SkillBoxClassesKey]?: string
  }
}

const SkillBox = (props: SkillBoxProps): JSX.Element => {
  const { className, classes = {} } = props

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
          <SubSkillBlock
            description="曾關注 Web Components 而學習 Polymer 的用法，並且曾使用過 Vue.js 進行開發，而目前主要使用 React.js 進行開發。"
            skills={[
              { name: 'React', value: 0.8 },
              { name: 'Vue', value: 0.4 },
              { name: 'Polymer', value: 0.6 },
              { name: 'jQuery', value: 0.5 },
            ]}
            title="Framwork & library"
          />
          <SubSkillBlock
            description="早期有使用過 Bootstrap 進行開發，目前主要是搭配 Material-UI 開發客製的組件。"
            skills={[
              { name: 'Material-UI', value: 0.7 },
              { name: 'Bootstrap', value: 0.4 },
            ]}
            title="CSS Framwork"
          />
          <SubSkillBlock
            description="許多開發框架預設支援 css-loader，開發上基本上都會維護到 CSS Modules的專案，近期熱衷於使用 Emotion 進行開發中。"
            skills={[
              { name: 'CSS Modules', value: 0.6 },
              { name: 'Emotion', value: 0.8 },
              { name: 'styled-jsx', value: 0.5 },
            ]}
            title="Modern CSS"
          />
          <SubSkillBlock
            description="以 Lerna 與 Yarn 建置 Mono-Repo 開發環境，並配合 Babel、TypeScript、Glob 等工具編譯後發布到內部的 npm registry。"
            skills={[
              { name: 'Babel', value: 0.4 },
              { name: 'TypeScript', value: 0.75 },
              { name: 'Webpack', value: 0.6 },
              { name: 'Gulp', value: 0.3 },
              { name: 'Lerna', value: 0.6 },
              { name: 'Yarn', value: 0.5 },
            ]}
            title="Build & Package Mangement"
          />
          <SubSkillBlock
            description="主要使用 Next.js SSG 的功能，藉由 Strapi 配合 CI/CD 的流程在內部編輯頁面後部署靜態頁面至外部環境。"
            skills={[
              { name: 'Next.js', value: 0.75 },
              { name: 'Strapi', value: 0.5 },
            ]}
            title="JAMstack"
          />
          <SubSkillBlock
            description="為了發佈 npm package 時會處理部分 CI/CD 的工作，目前主要使用到 Gitlab-CI。"
            skills={[
              { name: 'Gitlab-CI', value: 0.5 },
              { name: 'Github Actions', value: 0.3 },
            ]}
            title="CI & CD"
          />
          <SubSkillBlock
            description="與設計師合作時主要使用到 Sketch 與 Zeplin，目前正在自學 Figma 中。"
            skills={[
              { name: 'Sketch', value: 0.5 },
              { name: 'Zeplin', value: 0.7 },
              { name: 'Figma', value: 0.4 },
            ]}
            title="Design"
          />
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
