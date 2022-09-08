import colors from 'tailwindcss/colors'

import { Post } from '@interfaces/index'

export const posts: Array<Post> = [
  {
    name: 'Pioneer Interview: Rahul Tarak',
    url: 'https://pioneer.app/blog/rahul-tarak/',
    tag: 'startups',
    categories: ['startups'],
    date: 'June 1st, 2021',
    preview:
      'Rahul Tarak is a Pioneer from our October 2020 cohort, working on video editing software',
    published: true,
    id: '',
    slug: '',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  },
  {
    name: '🏗️ Building Electron with FFmpeg',
    url: 'https://blog.modfy.video/Building-Electron-with-FFmpeg',
    tag: 'technical',
    date: 'January 11th, 2021',
    preview: 'Building Electron with FFmpeg',
    categories: ['Electron', 'FFmpeg', 'NodeJS'],
    published: true,
    id: '',
    slug: '',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  },
  {
    name: ' Create Github Social Preview Images in a few clicks ',
    url: 'https://dev.to/cryogenicplanet/create-github-social-preview-images-in-a-few-clicks-285g',
    tag: 'other',
    date: 'Oct 24, 2020',
    published: true,
    categories: ['Electron', 'FFmpeg', 'NodeJS'],
    id: '',
    slug: '',
    preview: 'Create Github Social Preview Images in a few clicks',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  },
  {
    name: 'Search on Static Sites',
    url: `https://open.thevarsity.ca/Search-on-Static-Sites-or-Building-The-Varsity's-Student-Handbook-part-1`,
    tag: 'technical',
    date: 'September 19th, 2020',
    preview: 'Search on Static Sites',
    categories: ['NextJS', 'Algolia', 'Static Sites'],
    published: true,
    id: '',
    slug: '',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  },
  {
    name: 'Let’s talk about speed',
    url: `https://open.thevarsity.ca/Let's-talk-about-speed`,
    tag: 'technical',
    date: 'July 30th, 2020',
    preview: 'Let’s talk about speed',
    categories: ['Testing Speed', 'Image optimisation', 'Static Sites'],
    published: true,
    id: '',
    slug: '',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  },
  {
    name: 'Solving A SSL Error with Artificial Intelligence',
    url: 'https://open.thevarsity.ca/Solving-A-SSL-Error-with-Artificial-Intelligence-or-Adventures-in-Crashing-The-Varsity-with-Rahul-Tarak-Part-1',
    tag: 'technical',
    date: 'July 26th, 2020',
    preview: 'Solving A SSL Error with Artificial Intelligence',
    categories: ['SSL', 'Artificial Intelligence', 'GPT-3'],
    published: true,
    id: '',
    slug: '',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  },
  {
    name: 'Higher Order Numeric Differential Equations(Python)',
    url: 'https://towardsdatascience.com/higher-order-numeric-differential-equations-python-bc23dd148a0b',
    tag: 'technical',
    date: 'Feb 27, 2020',
    preview: 'Higher Order Numeric Differential Equations(Python)',
    categories: ['Python', 'Differential Equations'],
    published: true,
    id: '',
    slug: '',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  },
  {
    name: 'Twitter Client Side DOM Scrapping',
    url: 'https://medium.com/etwas/twitter-client-side-dom-scrapping-6f5a36ce3243',
    tag: 'technical',
    date: 'May 1, 2020',
    preview: 'Twitter Client Side DOM Scrapping',
    categories: ['Twitter', 'Web Scraping'],
    published: true,
    id: '',
    slug: '',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  },
  {
    name: 'Creating Smart Home Devices using IFTTT and Arduino',
    url: 'https://medium.com/etwas/creating-smart-home-devices-using-ifttt-and-arduino-8a3506168705',
    tag: 'technical',
    date: 'Jul 20, 2019',
    preview: 'Creating Smart Home Devices using IFTTT and Arduino',
    categories: ['Arduino', 'IFTTT', 'Smart Home'],
    published: true,
    id: '',
    slug: '',
    author: [
      {
        id: '',
        firstName: 'Rahul',
        lastName: 'Tarak',
        fullName: 'Rahul Tarak',
        profilePhoto: ''
      }
    ]
  }
]

export const postBadgeColors = {
  startup: {
    foreground: 'bg-green-100',
    background: 'text-green-800',
    bgHex: colors.green['100']
  },
  other: {
    foreground: 'bg-blue-100',
    background: 'text-blue-800',
    bgHex: colors.blue['100']
  },
  technical: {
    foreground: 'bg-red-100',
    background: 'text-red-800',
    bgHex: colors.red['100']
  }
}
