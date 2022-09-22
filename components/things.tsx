import Link from 'next/link'
import React, { useEffect } from 'react'

import Layout from '@components/Layout'
import { things, thingTypes } from '@data/things'
import {
  FilmIcon,
  LinkIcon,
  PresentationChartBarIcon,
  WalletIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import { view } from '@risingstack/react-easy-state'
import { state } from '@utils/store'

import { Card } from './Card'
import { SimpleLayout } from './SimpleLayout'
import { GitHubIcon } from './SocialIcons'

const tabs: {
  name: keyof typeof thingTypes | 'All'
  icon: React.ReactNode
  href: string
}[] = [
  {
    name: 'All',
    icon: WalletIcon,
    href: '/things'
  },
  {
    name: 'technical',
    icon: GitHubIcon,
    href: '/things/technical'
  },
  {
    name: 'hackathon',
    icon: WrenchScrewdriverIcon,
    href: '/things/hackathon'
  },
  {
    name: 'film',
    icon: FilmIcon,
    href: '/things/film'
  },
  {
    name: 'other',
    icon: PresentationChartBarIcon,
    href: '/things/other'
  }
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function ThingsNav({ filter }: { filter?: string }) {
  const currentTabName = filter
    ? tabs.find(tab => tab.href === `/things/${filter || ''}`)?.name
    : 'All'

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500"
          defaultValue={currentTabName}>
          {tabs.map(tab => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map(tab => (
              <Link key={tab.name} href={tab.href} passHref>
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.name === currentTabName
                      ? 'border-teal-500 text-teal-300'
                      : 'border-transparent text-gray-300 hover:text-gray-200  hover:border-gray-300',
                    'group inline-flex items-center py-4 capitalize px-1 border-b-2 font-medium text-sm'
                  )}>
                  {/* @ts-ignore */}
                  <tab.icon
                    className={classNames(
                      tab.name === currentTabName
                        ? 'text-teal-300'
                        : 'text-gray-300 group-hover:text-gray-200 ',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

const Things = ({ filter }: { filter?: string }) => {
  const filteredThings = filter ? things.filter(a => a.type === filter) : things

  useEffect(() => {
    state.noImageBg = true

    return () => {
      state.noImageBg = false
    }
  }, [])

  return (
    <Layout title="Projects | Rahul Tarak">
      <div className="py-10 ">
        <SimpleLayout
          title="Things I’ve made trying to put my dent in the universe."
          intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.">
          <div className="flex flex-col -mt-12 space-y-16">
            <ThingsNav filter={filter}></ThingsNav>
            <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {filteredThings.map(project => {
                let url: URL | undefined
                try {
                  url = new URL(project.url)
                } catch (err) {
                  if (typeof window !== 'undefined') {
                    url = new URL(project.url, window.location.origin)
                  }
                }

                const path = project.githubUrl
                  ? new URL(project.githubUrl).pathname
                  : undefined
                const owner = path?.split('/')[1]
                const repo = path?.split('/')[2]

                const socialImage = project.githubUrl
                  ? `https://socialify-no-default-logo.vercel.app/${owner}/${repo}/image?font=Inter&language=1&pattern=Charlie%20Brown&theme=Dark`
                  : `https://og.cryogenicplanet.tech/image?logo=${encodeURI(
                      project.logo || ''
                    )}&pattern=Charlie%20Brown&theme=Dark&title=${encodeURI(
                      project.title
                    )}`

                return (
                  <Card as="li" key={project.title}>
                    <img
                      className="w-full object-contain h-auto"
                      src={socialImage}
                      alt=""
                    />

                    <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                      <Card.Link href={project.url}>{project.title}</Card.Link>
                    </h2>
                    <Card.Description className="truncate">
                      {project.description}
                    </Card.Description>
                    <div className="relative w-full z-20 mt-6 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                      <div className="flex w-full max-w-[50%] items-center">
                        {project.githubUrl || project.links ? (
                          <div className="flex space-x-2">
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer">
                              <LinkIcon className="h-6 w-6 flex-none" />
                            </a>
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer">
                                <GitHubIcon className="h-6 w-6 flex-none" />
                              </a>
                            )}
                            {project.links && (
                              <>
                                {project.links.map(link => (
                                  <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer">
                                    {/* @ts-expect-error */}
                                    <link.icon className="h-6 w-6 flex-none" />
                                  </a>
                                ))}
                              </>
                            )}
                          </div>
                        ) : (
                          <>
                            <LinkIcon className="h-6 w-6 flex-none" />
                            <span className="ml-2 truncate">
                              {url?.hostname}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex-1 flex justify-end divide-x-2 divide-gray-500 divide-opacity-30">
                        <p className="px-2 capitalize">{project.type}</p>
                        <p className="px-2">{project.year}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </ul>
          </div>
        </SimpleLayout>
      </div>
    </Layout>
  )
}

export default view(Things)
