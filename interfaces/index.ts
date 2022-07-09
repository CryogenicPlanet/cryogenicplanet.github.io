export interface Post {
  id: string
  name: string
  tag: string
  published: boolean
  date: string
  slug: string
  author: Author[]
  preview: string
  ogImage?: string
  staticImage?: string
  categories: string[]
}

export interface Movie extends Rating {
  id: string
  Name: string
  Tier: string
  poster: string
  Seen: string
  '2022 Release': boolean
  'Where did you watch': string[]
  Rewatch: boolean
  posterOverwrite: string
}

export interface Author {
  id: string
  firstName: string
  lastName: string
  fullName: string
  profilePhoto: string
}

export interface Rating {
  Enjoyment: string
  Quality: string
  Disappointment: string
}
