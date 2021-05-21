import Link from 'next/link'
import React from 'react'

import Layout from '@components/Layout'
import { thingBadgeColors, things, thingTypes } from '@data/things'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const Things = ({ filter }: { filter?: string }) => {
  const filteredThings = filter ? things.filter(a => a.type === filter) : things

  const tabs = [
    { name: 'All', href: '/things' },
    ...Object.keys(thingTypes).map(key => {
      return { name: key, href: `/things/${key}` }
    })
  ]

  const currentTabName = filter
    ? tabs.find(tab => tab.href === `/things/${filter || ''}`)?.name
    : 'All'

  return (
    <Layout title="Projects | Rahul Tarak">
      <div className="py-10 ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold dark:text-gray-200 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              List of Projects
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              There are some things I have build/made
            </p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 space-y-6 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
          <div className="w-full">
            <Link href="/" passHref>
              <a
                className="text-gray-800 dark:text-gray-50 pr-3 font-inter text-lg font-medium"
                href="/">{`<< Home`}</a>
            </Link>
          </div>

          <div className="w-full">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full cap focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                defaultValue={currentTabName}>
                {tabs.map(tab => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav
                className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                aria-label="Tabs">
                {tabs.map((tab, tabIdx) => {
                  const current = currentTabName === tab.name

                  return (
                    <Link href={tab.href} passHref key={tab.name}>
                      <a
                        href={tab.href}
                        className={classNames(
                          current
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700',
                          tabIdx === 0 ? 'rounded-l-lg' : '',
                          tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                          'group  relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                        aria-current={current ? 'page' : undefined}>
                        <span className="capitalize">{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            current ? 'bg-indigo-500' : 'bg-transparent',
                            'absolute inset-x-0 bottom-0 h-0.5'
                          )}
                        />
                      </a>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
          {filteredThings.map((thing, index) => {
            const colors = thingBadgeColors[thing.type]

            return (
              <div className="flex flex-col w-full space-y-1" key={index}>
                <div className="w-full flex space-x-2 items-center">
                  <div className="hidden bg-red-100 bg-blue-100 bg-green-100 text-green-800 text-red-800 text-blue-800 bg-orange-100 text-orange-800"></div>
                  <a
                    className="text-gray-800  dark:text-gray-50  font-inter text-xl font-medium"
                    target="_blank"
                    rel="noreferrer"
                    href={thing.url}>
                    {thing.title}
                  </a>

                  <span
                    className={`inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-yellow-800 bg-yellow-100 `}>
                    {thing.year}
                  </span>

                  <span
                    className={`inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.foreground} ${colors.background} `}>
                    {thing.type}
                  </span>
                  {thing.sourceUrl && (
                    <a target="_blank" rel="noreferrer" href={thing.sourceUrl}>
                      <svg className="h-[20px] w-auto" viewBox="0 0 128 128">
                        <g fill="#181616">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path>
                          <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                        </g>
                      </svg>
                    </a>
                  )}
                </div>
                <div className="w-full flex px-2 items-center">
                  <p className="text-gray-600 dark:text-gray-300 font-thin font-inter text-sm">
                    {thing.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Things
