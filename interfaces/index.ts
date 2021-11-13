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

export interface Review extends Rating {
  id: string
  name: string
  tag: string
  published: boolean
  slug?: string
  date: string
  author: Author[]
  preview: string
  staticImage?: string
  categories: string[]
}

export interface Author {
  id: string
  firstName: string
  lastName: string
  fullName: string
  profilePhoto: string
}

export interface Rating {
  enjoyment: number
  quality: number
  disappointment: number
}
