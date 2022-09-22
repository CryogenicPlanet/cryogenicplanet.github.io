import React from 'react'
import colors from 'tailwindcss/colors'

import { MediumIcon, TwitterIcon } from '@components/SocialIcons'

export const thingTypes = {
  technical: true,
  hackathon: true,
  film: true,
  other: true
}

const unsortedThings: Array<{
  title: string
  url: string
  githubUrl?: string
  logo?: string
  links?: { href: string; icon: React.ReactNode }[]
  description?: string
  type: keyof typeof thingTypes
  year: number
}> = [
  {
    title: 'Typed Routes',
    url: 'https://github.com/CryogenicPlanet/typed-routes',
    githubUrl: 'https://github.com/CryogenicPlanet/typed-routes',
    type: 'technical',
    year: 2022,
    description: 'A super simple minimal tRPC alternative for next.js'
  },
  {
    title: 'Nominal',
    url: 'https://zackoverflow.dev/writing/nominal-and-refinement-types-typescript',
    type: 'technical',
    year: 2022,
    description: 'A TypeScript library for nominal typing.',
    githubUrl: 'https://github.com/modfy/nominal'
  },
  {
    title: 'Socialify',
    url: 'https://socialify.git.ci/',
    type: 'technical',
    githubUrl: 'https://github.com/wei/socialify',
    description: '800+ stars; Generate dynamic social preview images',
    year: 2020
  },
  {
    title: 'Twitter Source Bot',
    url: 'https://twitter-source-bot.netlify.app/',
    type: 'technical',
    githubUrl: 'https://github.com/Etwas-Builders/Twitter-Source-Bot',
    description: ` Ever wanted to know the source of a tweet? Just @whosaidthis_bot and I'll tell you where it came from `,
    year: 2020
  },
  {
    title: 'Varsity Deconstruct 2020 Magazine',
    url: 'https://deconstruct.thevarsity.ca/',
    type: 'technical',
    year: 2020,
    description: `Built the Varsity's 2020 Digital Magazine`
  },

  {
    title: 'Uoft 2020 Student Digital Handbook',
    url: 'https://handbook.thevarsity.ca/',
    type: 'technical',
    year: 2020,
    description: `Built the Varsity's 2020 Student Handbook`
  },

  {
    title: 'Koelkast',
    url: 'https://devpost.com/software/koelkast',
    type: 'hackathon',
    githubUrl: 'https://github.com/CryogenicPlanet/HTV4',
    description: ' A smart inventory management solution for Refrigerators ',
    year: 2020
  },
  {
    title: 'Clothology',
    url: 'https://devpost.com/software/clothology',
    type: 'hackathon',
    githubUrl: 'https://github.com/CryogenicPlanet/UofTHacks-2020',
    description:
      ' Not sure what to wear in unpredictable weather? Clothology allows you to choose your clothing attire based on what others in your area are wearing. ',
    year: 2020
  },
  {
    title: 'Stanza',
    url: 'http://stanzabooks.herokuapp.com/#!/login',
    type: 'technical',
    githubUrl: 'https://github.com/CryogenicPlanet/Stanza-Cisco-Internship',
    description: 'A community for sharing books',
    year: 2017
  },
  {
    title: 'Phorum',
    url: 'https://phorum-mylan-hacks.netlify.app/',
    type: 'hackathon',
    githubUrl: 'https://github.com/CryogenicPlanet/Mylan_Hack_16',
    description:
      ' A forum where you can report issues you faced after consumption of drugs, and report possible drug defects.. ',
    year: 2016
  },
  {
    title: 'Research paper on Ozone Concentration in Bangalore',
    url: 'https://www.cfrce.com/images/Investigating_the_vertical_ozone_profile_with_a_specific_focus_on_the_ground_level_and_tropospheric_.pdf',
    year: 2019,
    description:
      'Investigating the vertical ozone profile, with aspecific focus on the ground level andtropospheric ozone over Bangalore.',
    type: 'other'
  },
  {
    title: 'Zonne Solaris',
    url: 'https://github.com/CryogenicPlanet/wired_hack',
    type: 'hackathon',
    githubUrl: 'https://github.com/CryogenicPlanet/wired_hack',
    description: 'Solar Projects Crowd Funding Platform!',
    year: 2016
  },
  {
    title: 'Vivum Hack 2018 Winners',
    url: 'https://github.com/CryogenicPlanet/vivum-hack',
    githubUrl: 'https://github.com/CryogenicPlanet/vivum-hack',
    type: 'hackathon',
    description: 'Machine Learning Based Facial Recognition for attendance',
    year: 2018
  },
  {
    title: 'Stonehill Hack 2018 Winners',
    url: 'https://github.com/CryogenicPlanet/Stonehill-Hackathon',
    githubUrl: 'https://github.com/CryogenicPlanet/Stonehill-Hackathon',
    type: 'hackathon',
    description:
      'Using Face dection and Facial Recognition to identify indiviuals entering a room and controlling electronics in the room based on their preference, i.e turning on fans or air conditioners or which lights to turn on, what color the lights should be.',
    year: 2018
  },
  {
    title: 'Nps-Hsr-Grad-2017',
    url: 'https://github.com/CryogenicPlanet/Nps-Hsr-Grad-2017',
    githubUrl: 'https://github.com/CryogenicPlanet/Nps-Hsr-Grad-2017',
    type: 'technical',
    description:
      'This was app made to invite and checkin people for the Nps Hsr Grad party. It could be ported within a couple of hours to serve this purpose for any event',
    year: 2017
  },

  {
    title: 'DCB Hackathon',
    url: 'https://github.com/CryogenicPlanet/DcbHackathon',
    githubUrl: 'https://github.com/CryogenicPlanet/DcbHackathon',
    year: 2017,
    description:
      ' ATM Solution to allow users to withdraw money from ATM using their phones ',
    type: 'hackathon'
  },
  {
    title: 'RHOK Hack Winner',
    url: 'https://github.com/CryogenicPlanet/rhokBangalore2018',
    githubUrl: 'https://github.com/CryogenicPlanet/rhokBangalore2018',
    year: 2018,
    description: ' Using a ml model to identify plant and animal species ',
    type: 'hackathon'
  },
  {
    title: `Mini Research Paper comparing hashing algorithms`,
    url: '/files/ee.pdf',
    githubUrl: 'https://github.com/CryogenicPlanet/Extended-Essay',
    year: 2019,
    description: `How do hashing algorithms in specific

SHA256, SHA512 and MD5 affect

Number of Passwords decrypted and

Computational Power required in a

given period?`,
    type: 'other'
  },
  {
    title: 'Mini Research Paper exploring hash collisions',
    url: '/files/hashCollisions.pdf',
    githubUrl: 'https://github.com/CryogenicPlanet/mathIA',
    year: 2019,
    type: 'other',
    description: `Expected Number of Hash

Collisions for a given

hash algorithm.`
  },
  {
    title: 'Bauernhof | NPS K Hack',
    url: 'https://github.com/CryogenicPlanet/Bauernhof',
    githubUrl: 'https://github.com/CryogenicPlanet/Bauernhof',
    year: 2016,
    type: 'hackathon',
    description:
      'Soil Mostiure Anaylsis Application using Arduino and Soil Mositure Sensor'
  },
  {
    title: 'Broken Paths',
    url: 'https://www.youtube.com/watch?v=PcFoeIruD7o',
    year: 2019,
    logo: 'https://user-images.githubusercontent.com/10355479/191543286-6da3001d-847e-4182-a025-2a7b8fc72aa1.svg',
    type: 'film',
    description:
      'Three childhood best friends choose to walk down different paths when faced with one of the biggest challenges of their teenage years: getting into college'
  },
  {
    title: 'Elevator Pitch',
    url: 'https://www.youtube.com/watch?v=ee_xjJUCRt8',
    year: 2018,
    logo: 'https://user-images.githubusercontent.com/10355479/191543286-6da3001d-847e-4182-a025-2a7b8fc72aa1.svg',
    type: 'film',
    description: `
The short film was made for the India film project season 8. It was a part of the amateur category with the given theme being experience change. The film was made in 50 hours for the contest.
`
  },
  {
    title: 'Incognita',
    url: 'https://www.youtube.com/watch?v=URP6oNtLa8E',
    year: 2018,
    logo: 'https://user-images.githubusercontent.com/10355479/191543286-6da3001d-847e-4182-a025-2a7b8fc72aa1.svg',
    type: 'film',
    description: `This was a short film made from start to finish in just 48 hours for The Next Indian Dream's 48-hour filmmaking contest www.tnid.in`
  },
  {
    title: 'Smart Home Automation',
    url: 'https://www.youtube.com/watch?v=HU4r4h7fIs0',
    year: 2018,
    type: 'technical',
    description:
      'While this may not be as complex as other, it is the project I used the most by far',
    links: [
      {
        href: 'https://medium.com/etwas/creating-smart-home-devices-using-ifttt-and-arduino-8a3506168705',
        icon: MediumIcon
      }
    ]
  },
  {
    title: 'Go Fluent FFmpeg',
    url: 'https://github.com/modfy/go-fluent-ffmpeg',
    year: 2021,
    type: 'technical',
    githubUrl: 'https://github.com/modfy/go-fluent-ffmpeg',
    description: ' A Go implementation of fluent-ffmpeg '
  },
  {
    title: 'Depp',
    url: 'https://github.com/CryogenicPlanet/depp',
    year: 2021,
    type: 'technical',
    githubUrl: 'https://github.com/CryogenicPlanet/depp',
    description:
      '⚡ Check your npm modules for unused and duplicate dependencies fast'
  },
  {
    title: 'Testickle',
    url: 'https://testickle.vercel.app/',
    year: 2022,
    type: 'technical',
    logo: 'https://user-images.githubusercontent.com/10355479/191545053-2d3c043d-cd1a-4530-9613-bdf7315b53a1.svg',
    links: [
      {
        href: 'https://twitter.com/zack_overflow/status/1496096037211103232?s=20&t=v2pox-AYruZuHOdeFPumMA',
        icon: TwitterIcon
      }
    ],
    description:
      'Testickle is a blazing faster typescript/javascript test runner built on esbuild'
  },
  {
    title: 'Fenster',
    url: 'https://github.com/CryogenicPlanet/fenster',
    year: 2022,
    type: 'technical',
    githubUrl: 'https://github.com/CryogenicPlanet/fenster',
    description: 'Sane macos spaces'
  },
  {
    title: 'Stellage',
    url: 'https://stellage.vercel.app',
    year: 2022,
    type: 'technical',
    logo: 'https://user-images.githubusercontent.com/10355479/191545332-0cb88318-3d04-478b-aac0-a26b9138ccb8.svg',
    description:
      'Staging management tool for vercel - verify, promote and rollback environments'
  }
]

export const things = unsortedThings.sort((a, b) => b.year - a.year)

export const thingBadgeColors: {
  // eslint-disable-next-line no-unused-vars
  [name in keyof typeof thingTypes]: {
    foreground: string
    background: string
    bgHex: string
  }
} = {
  other: {
    foreground: 'bg-green-100',
    background: 'text-green-800',
    bgHex: colors.green[100]
  },
  technical: {
    foreground: 'bg-red-100',
    background: 'text-red-800',
    bgHex: colors.red[100]
  },
  hackathon: {
    foreground: 'bg-orange-100',
    background: 'text-orange-800',
    bgHex: colors.orange[100]
  },
  film: {
    foreground: 'bg-green-100',
    background: 'text-green-800',
    bgHex: colors.green[100]
  }
}
