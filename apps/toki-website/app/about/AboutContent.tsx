'use client'

import { useEffect, useState } from 'react'
import siteContent from '@/content/siteContent'
import { sanitizeHtml } from '@/lib/sanitize'
import MessageBox from '@/components/MessageBox'
import Box from '@/components/Box'
import ScrollableBox from '@/components/ScrollableBox'
import SubSkillBlock from '@/components/SubSkillBlock'
import TagSubSkillBlock from '@/components/TagSubSkillBlock'

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
    <div className="flex flex-col h-full w-full lg:flex-row lg:items-center lg:justify-between xl:justify-around">
      {/* Left: bio */}
      <div className="basis-1/2 flex flex-col justify-evenly pt-2.5 md:basis-[45%] md:pt-0 lg:h-112.5 lg:items-center lg:justify-between xl:max-w-175">
        <MessageBox
          className="w-full p-2.5 mb-5 md:text-3xl md:h-15"
          style={{ transform: leftTransform, transition }}
        >
          {name}
        </MessageBox>
        <MessageBox
          className="w-full p-4 mb-5 sm:p-6 xl:mb-0"
          style={{ transform: leftTransform, transition }}
        >
          <span className="about-description" dangerouslySetInnerHTML={{ __html: safeDescription }} />
        </MessageBox>
      </div>

      {/* Right: skills */}
      <div className="flex basis-[55%] flex-col items-center justify-center lg:basis-[45%] xl:max-w-175">
        <Box
          className="w-full lg:h-112.5"
          style={{ transform: rightTransform, transition }}
        >
          <ScrollableBox className="p-0 h-full">
            <div className="p-2.5 lg:p-6">
              <div className="text-h3 font-bold text-white">SKILL</div>
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
