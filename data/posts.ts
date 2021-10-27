import colors from 'tailwindcss/colors'

export const posts: Array<{
  title: string
  url: string
  type: 'technical' | 'startup' | 'other'
  local?: boolean
}> = [
  {
    title: 'Hiring for Broke Startups',
    url: 'https://blog.modfy.video/Hiring-for-Broke-Startups',
    type: 'startup'
  },
  {
    title: '🏗️ Building Electron with FFmpeg',
    url: 'https://blog.modfy.video/Building-Electron-with-FFmpeg',
    type: 'technical'
  },
  {
    title: 'Be an active protagonist in your life',
    url: 'https://blog.modfy.video/Be-an-active-protagonist-in-your-life',
    type: 'startup'
  },
  {
    title: ' Create Github Social Preview Images in a few clicks ',
    url: 'https://dev.to/cryogenicplanet/create-github-social-preview-images-in-a-few-clicks-285g',
    type: 'other'
  },
  {
    title: 'Search on Static Sites',
    url: `https://open.thevarsity.ca/Search-on-Static-Sites-or-Building-The-Varsity's-Student-Handbook-part-1`,
    type: 'technical'
  },
  {
    title: 'Let’s talk about speed',
    url: `https://open.thevarsity.ca/Let's-talk-about-speed`,
    type: 'technical'
  },
  {
    title: 'Solving A SSL Error with Artificial Intelligence',
    url: 'https://open.thevarsity.ca/Solving-A-SSL-Error-with-Artificial-Intelligence-or-Adventures-in-Crashing-The-Varsity-with-Rahul-Tarak-Part-1',
    type: 'technical'
  },
  {
    title: 'Higher Order Numeric Differential Equations(Python)',
    url: 'https://towardsdatascience.com/higher-order-numeric-differential-equations-python-bc23dd148a0b',
    type: 'technical'
  },
  {
    title: 'Twitter Client Side DOM Scrapping',
    url: 'https://medium.com/etwas/twitter-client-side-dom-scrapping-6f5a36ce3243',
    type: 'technical'
  },
  {
    title: 'Creating Smart Home Devices using IFTTT and Arduino',
    url: 'https://medium.com/etwas/creating-smart-home-devices-using-ifttt-and-arduino-8a3506168705',
    type: 'technical'
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
