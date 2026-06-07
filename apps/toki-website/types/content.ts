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

export type BannerFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
}

export type Work = {
  id: number
  name: string
  url?: string
  banner: {
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
      large: BannerFormat
      small: BannerFormat
      medium: BannerFormat
      thumbnail: BannerFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
  }
}

export type SiteContent = {
  id: number
  name: string
  description: string
  skillCategories: SkillCategory[]
  works: Work[]
}
