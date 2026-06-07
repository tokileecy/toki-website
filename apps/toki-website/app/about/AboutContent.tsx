'use client'

import { useEffect, useState } from 'react'
import siteContent from '@/content/siteContent'
import { sanitizeHtml } from '@/lib/sanitize'
import MessageBox from '@/components/MessageBox'
import Box from '@/components/Box'
import ScrollableBox from '@/components/ScrollableBox'
import SubSkillBlock from '@/components/SubSkillBlock'
import TagSubSkillBlock from '@/components/TagSubSkillBlock'
import styles from './about.module.css'

const OTHER_SKILLS = [
  'HTML5', 'CSS3', 'JavaScript', 'ES6/ES5', 'Typescript', 'SCSS', 'C#',
  'Npm', 'Yarn', 'Storybook', 'Axios', 'ESLint', 'StyleLint', 'Redux',
  'MobX', 'Web Components', 'Three.js', 'Tween.js', 'NodeJS', 'ASP.NET Core',
  'Nginx', 'Docker', 'Json Schema', 'Git', 'GitLab',
]

export default function AboutContent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const { name, description, skillCategories } = siteContent
  const safeDescription = sanitizeHtml(description)

  const leftTransform = show ? 'translateX(0)' : 'translateX(-130vw)'
  const rightTransform = show ? 'translateX(0)' : 'translateX(130vw)'
  const transition = show ? 'transform 1s' : 'none'

  return (
    <div className={styles.root}>
      {/* Left: bio */}
      <div className={styles.leftBlock}>
        <MessageBox
          className={styles.leadRoleBox}
          style={{ transform: leftTransform, transition }}
        >
          {name}
        </MessageBox>
        <MessageBox
          className={styles.recentlyBox}
          style={{ transform: leftTransform, transition }}
        >
          <span dangerouslySetInnerHTML={{ __html: safeDescription }} />
        </MessageBox>
      </div>

      {/* Right: skills */}
      <div className={styles.rightBlock}>
        <Box
          className={styles.skillBox}
          style={{ transform: rightTransform, transition }}
        >
          <ScrollableBox className={styles.skillBoxScroll}>
            <div className={styles.skillBoxInner}>
              <div className={styles.skillTitle}>SKILL</div>
              {skillCategories.map((cat) => (
                <SubSkillBlock
                  key={cat.id}
                  title={cat.name}
                  description={cat.description}
                  skills={cat.skills.map((s) => ({ name: s.name, value: s.level / 100 }))}
                />
              ))}
              <TagSubSkillBlock skills={OTHER_SKILLS} title="Others" />
            </div>
          </ScrollableBox>
        </Box>
      </div>
    </div>
  )
}
