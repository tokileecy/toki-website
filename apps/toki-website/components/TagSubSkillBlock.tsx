import styles from './TagSubSkillBlock.module.css'

interface TagSubSkillBlockProps {
  title?: string
  skills?: string[]
}

export default function TagSubSkillBlock({ title = '', skills = [] }: TagSubSkillBlockProps) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.header} />
      <div className={styles.content}>
        {skills.map((skill) => (
          <span key={skill} className={styles.tag}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
