import Skill from './Skill'

interface SubSkillBlockProps {
  title?: string
  description?: string
  skills?: { name: string; value: number }[]
}

export default function SubSkillBlock({ title = '', description = '', skills = [] }: SubSkillBlockProps) {
  return (
    <div className="w-full font-medium">
      <div className="py-2.5 pr-2.5 text-white w-full min-h-5 text-xl font-bold md:text-2xl">{title}</div>
      <div className="bg-[rgb(0,255,255)] w-full h-0.5" />
      <div className="py-2.5 text-white min-h-25 flex items-start flex-col">
        <div className="grow overflow-hidden pr-2.5">{description}</div>
        <div className="flex flex-col items-end justify-around mt-3 w-full">
          {skills.map((skill) => (
            <Skill key={skill.name} name={skill.name} score={skill.value} />
          ))}
        </div>
      </div>
    </div>
  )
}
