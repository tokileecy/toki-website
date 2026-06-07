interface TagSubSkillBlockProps {
  title?: string
  skills?: string[]
}

export default function TagSubSkillBlock({ title = '', skills = [] }: TagSubSkillBlockProps) {
  return (
    <div className="w-full">
      <div className="p-[10px] text-white w-full min-h-[20px] text-[32px] font-bold">{title}</div>
      <div className="bg-[rgb(0,255,255)] w-full h-[2px]" />
      <div className="p-[10px] pr-0 text-white min-h-[100px] flex grow items-start flex-wrap">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-[rgb(0,230,230)] text-[#0b0b0b] font-bold text-sm rounded-[2px] leading-4 text-center mr-[5px] mb-[10px] px-[5px] py-[3px] whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
