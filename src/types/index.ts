export interface SkillCategory {
  title: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level: number // 0–100
  yearsExp: number
  lastUsed: number
}

export interface Experience {
  id: string
  period: string
  dateFrom: string
  dateTo: string
  title: string
  role: string
  stack: string[]
  description: string
  achievements: string[]
  industry?: string
}

export interface Project extends Experience {
  highlight?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface PersonInfo {
  name: string
  firstName: string
  lastName: string
  title: string
  subtitle: string
  bio: string[]
  yearsExp: number
  email: string
  github?: string
  linkedin?: string
  location: string
  languages: { name: string; level: string }[]
  education: string
}
