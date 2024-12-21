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

export type Format = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string
  size: number
  width: number
  height: number
}

export type Work = {
  id: number
  name: string
  banner: {
    id: number
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      large: Format
      small: Format
      medium: Format
      thumbnail: Format
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
  }
}
