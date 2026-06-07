import styles from './Skill.module.css'

interface SkillProps {
  name: string
  score: number
}

export default function Skill({ name, score }: SkillProps) {
  const clamped = Math.min(1, Math.max(0, score))

  return (
    <div className={styles.root}>
      <em>{name}</em>
      <div
        className={styles.bar}
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            #01ecf9 0,
            #01ecf9 ${clamped * 100}%,
            #3d6666 ${clamped * 100}%,
            #3d6666 100%
          )`,
        }}
      />
    </div>
  )
}
