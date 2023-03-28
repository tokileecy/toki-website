export type Skill = {
  id: number
  name: string
  level: number
}

export type SkillCategory = {
  id: number
  name: string
  description: string
  skills: Skill[]
}

declare type Api = {
  getData: () => {
    id: number
    name: string
    description: string
    skillCategories: SkillCategory[]
  }
}

declare const api: Api

export { Api }

export default api
