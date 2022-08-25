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

export const movieDevice = {
  '🛋️ Private theatre': {
    name: '🛋️ Private theatre',
    color: 'green',
    rgba: '77,171,154,0.5'
  },
  '💺Imax': { name: '💺Imax', color: 'pink', rgba: '226,85,161,0.5' },
  '🪑Theatre': { name: '🪑Theatre', color: 'default', rgba: '80,85,88' },
  '📺 UW': { name: '📺 Ultrawide', color: 'purple', rgba: '154,109,215,0.5' },
  '💻 Laptop': { name: '💻 Laptop', color: 'blue', rgba: '82,156,202,0.5' },
  '📱IPad': { name: '📱IPad', color: 'orange', rgba: '255,163,68,0.5' }
} as const

export type MovieDevice = keyof typeof movieDevice

export const whereWatch = {
  '🏴‍☠️ Piracy': { name: '🏴‍☠️ Piracy', color: 'yellow', rgba: '255,220,73,0.5' },
  Hotstar: { name: 'Hotstar', color: 'brown', rgba: '147,114,100,0.5' },
  Netflix: { name: 'Netflix', color: 'pink', rgba: '226,85,161,0.5' },
  'Prime Video': {
    name: 'Prime Video',
    color: 'orange',
    rgba: '255,163,68,0.5'
  },
  'Multiple times (Theatre)': {
    name: 'Multiple times (Theatre)',
    color: 'green',
    rgba: '77,171,154,0.5'
  },
  'Opening Weekend (Theatre)': {
    name: 'Opening Weekend (Theatre)',
    color: 'purple',
    rgba: '154,109,215,0.5'
  },
  'Caught in Theatres': {
    name: 'Caught in Theatres',
    color: 'blue',
    rgba: '82,156,202,0.5'
  },
  'Missed in Theatres': {
    name: 'Missed in Theatres',
    color: 'yellow',
    rgba: '255,220,73,0.5'
  },
  "Didn't want to watch in Theatres": {
    name: "Didn't want to watch in Theatres",
    color: 'red',
    rgba: '255,115,105,0.5'
  },
  "Didn't Release in Theatres": {
    name: "Didn't Release in Theatres",
    color: 'default',
    rgba: '80,85,88'
  },
  'Not from this year': {
    name: 'Not from this year',
    color: 'gray',
    rgba: '151,154,155,0.5'
  }
} as const

export type MovieWhereWatch = keyof typeof whereWatch

export interface Movie extends Rating {
  id: string
  Name: string
  Tier: string
  poster?: string
  Seen: string
  '2022 Release': boolean
  'Where did you watch': MovieWhereWatch[]
  'Device/Location': MovieDevice
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

export interface OmdbSearch {
  Search: Search[]
  totalResults: string
  Response: string
}

export interface Search {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
