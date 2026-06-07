interface SkillProps {
  name: string
  score: number
}

export default function Skill({ name, score }: SkillProps) {
  const clamped = Math.min(1, Math.max(0, score))
  return (
    <div className="flex flex-col items-start pr-[5px] w-full text-[17px] mt-[0.5em] first:mt-0">
      <em className="leading-[1.6rem]">{name}</em>
      <div
        className="w-full h-5"
        style={{
          backgroundImage: `linear-gradient(90deg, #01ecf9 0, #01ecf9 ${clamped * 100}%, #3d6666 ${clamped * 100}%, #3d6666 100%)`,
        }}
      />
    </div>
  )
}
