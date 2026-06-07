import Skill from './Skill'

interface SubSkillBlockProps {
  title?: string
  description?: string
  skills?: { name: string; value: number }[]
}

export default function SubSkillBlock({ title = '', description = '', skills = [] }: SubSkillBlockProps) {
  return (
    <div className="w-full font-medium">
      <div className="py-[10px] pr-[10px] text-white w-full min-h-[20px] text-xl font-bold md:text-2xl">{title}</div>
      <div className="bg-[rgb(0,255,255)] w-full h-[2px]" />
      <div className="py-[10px] text-white min-h-[100px] flex items-start flex-col">
        <div className="grow overflow-hidden pr-[10px]">{description}</div>
        <div className="flex flex-col items-end justify-around mt-3 w-full">
          {skills.map((skill) => (
            <Skill key={skill.name} name={skill.name} score={skill.value} />
          ))}
        </div>
      </div>
    </div>
  )
}
