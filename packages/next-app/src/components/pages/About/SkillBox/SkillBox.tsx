import React from 'react'
import ScrollableContent from '@psycholog-studio/ui/Containers/ScrollableBox/ScrollableContent'
import Box from '../../../Box'
import SubSkillBlock from '../../../SubSkillBlock'
import TagSubSkillBlock from '../../../SubSkillBlock/TagSubSkillBlock'
import * as styles from './SkillBox.styles'

export type SkillBoxProps = {
  className?: string
}

const SkillBox = (props: SkillBoxProps): JSX.Element => {
  const { className } = props

  return (
    <Box className={className}>
      <ScrollableContent>
        <div className={styles.title}>{'SKILL'}</div>
        <SubSkillBlock
          description="曾因關注新的標準，而學習了 Polymer 與一些 Web Components 的知識，後來工作中主要都使用到 React.js 進行開發，但持續關注 Web Components 的發展。"
          minWidth="40%"
          skills={[
            { name: 'React', value: 0.8 },
            { name: 'Vue', value: 0.3 },
            { name: 'Polymer', value: 0.5 },
            { name: 'jQuery', value: 0.4 },
          ]}
          title="Framwork & library"
        />
        <SubSkillBlock
          description="在比較早期有短暫使用過 Bootstrap 進行開發，使用 React.js 後主要是開發與維護客製的組件，並配合使用 Material-UI 。"
          minWidth="40%"
          skills={[
            { name: 'Material-UI', value: 0.7 },
            { name: 'Bootstrap', value: 0.4 },
          ]}
          title="CSS Framwork"
        />
        <SubSkillBlock
          description="許多開發框架預設支援 css-loader，開發上總會維護到 CSS Modules的專案，而最近因 Emotion 令人驚艷的開發體驗，正熱衷於使用 Emotion 進行開發。"
          minWidth="40%"
          skills={[
            { name: 'CSS Modules', value: 0.7 },
            { name: 'Emotion', value: 0.9 },
            { name: 'style jsx', value: 0.5 },
          ]}
          title="Modern CSS"
        />
        <SubSkillBlock
          description="以 Lerna 建置 Mono-Repo 開發環境，依照各模組工具的需求切分 Repo ，並使用合適的 Build 工具（Babel、Typescript、Glob 等...），並按照專案規模與需求選擇是否發布到內部的 npm registry。"
          minWidth="40%"
          skills={[
            { name: 'Babel', value: 0.4 },
            { name: 'Webpack', value: 0.6 },
            { name: 'Gulp', value: 0.3 },
            { name: 'Lerna', value: 0.5 },
          ]}
          title="Build Tools"
        />
        <SubSkillBlock
          description="主要使用 Next.js SSG 的功能，藉由 HeadLess CMS 配合 CI/CD 的流程可以在內部編輯頁面後部署靜態頁面至外部環境。"
          minWidth="20%"
          skills={[{ name: 'Next.js', value: 0.4 }]}
          title="SSR & SSG"
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
            'Docker',
            'Json Schema',
            'Git',
            'GitLab',
          ]}
          title="Others"
        />
      </ScrollableContent>
    </Box>
  )
}

export default SkillBox
