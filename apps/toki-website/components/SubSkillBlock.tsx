import Skill from './Skill'
import styles from './SubSkillBlock.module.css'

interface SubSkillBlockProps {
  title?: string
  description?: string
  skills?: { name: string; value: number }[]
}

export default function SubSkillBlock({ title = '', description = '', skills = [] }: SubSkillBlockProps) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.header} />
      <div className={styles.content}>
        <div className={styles.description}>{description}</div>
        <div className={styles.skills}>
          {skills.map((skill) => (
            <Skill key={skill.name} name={skill.name} score={skill.value} />
          ))}
        </div>
      </div>
    </div>
  )
}
