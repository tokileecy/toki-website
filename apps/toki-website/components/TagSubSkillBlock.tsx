interface TagSubSkillBlockProps {
  title?: string
  skills?: string[]
}

export default function TagSubSkillBlock({ title = '', skills = [] }: TagSubSkillBlockProps) {
  return (
    <div className="w-full">
      <div className="p-2.5 text-white w-full min-h-5 text-h5 font-bold">{title}</div>
      <div className="bg-[rgb(0,255,255)] w-full h-0.5" />
      <div className="p-2.5 pr-0 text-white min-h-25 flex grow items-start flex-wrap">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-[rgb(0,230,230)] text-[#0b0b0b] font-bold text-sm rounded-sm leading-4 text-center mr-1 mb-2.5 px-1 py-0.5 whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
