import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import React, { ReactNode, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { navigation } from '@data/navigation'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { view } from '@risingstack/react-easy-state'
import { state } from '@utils/store'

type Props = {
  children?: ReactNode
  title?: string
  footerBg?: string
  ogImage?: string
  skipSeo?: boolean
}

const Layout = ({
  children,
  title = 'Rahul Tarak',
  footerBg,
  ogImage,
  skipSeo
}: Props) => {
  useEffect(() => {
    const dark = window.localStorage.getItem('darkMode')
    state.dark = dark === 'true'
  }, [])

  useEffect(() => {
    window.localStorage.setItem('darkMode', state.dark ? 'true' : 'false')
  }, [state.dark])

  const router = useRouter()

  return (
    <div className={state.dark ? 'dark' : ''}>
      <div className="w-full min-h-screen transition-colors duration-500 ease-in-out h-full bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <Head>
          <link rel="icon" href="/images/laptop.svg"></link>
          <meta charSet="utf-8" />

          {!skipSeo && (
            <>
              <title>{title}</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <meta name="og:title" content="Rahul Tarak"></meta>
              <meta
                name="og:description"
                content="Personal space on the internet"></meta>
              <meta name="og:type" content="website"></meta>
              <meta
                name="og:image"
                content={
                  ogImage ||
                  `https://og.railway.app/api/image?fileType=png&layoutName=Simple&Text=${
                    router.pathname === '/'
                      ? 'Rahul+Tarak'
                      : `${router.pathname[1].toUpperCase()}${router.pathname.slice(
                          2
                        )}+%7C+Rahul+Tarak`
                  }`
                }></meta>
              <meta name="og:url" content={router.pathname}></meta>
            </>
          )}
        </Head>

        {/* This example requires Tailwind CSS v2.0+ */}
        <Toaster position="top-right"></Toaster>
        <div className="h-full">
          {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}

          <main
            className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex={0}>
            <div className="w-full mx-auto">{children}</div>
          </main>
        </div>

        <footer className={footerBg || 'bg-transparent'}>
          <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <nav
              className="-mx-5 -my-2 flex flex-wrap justify-center"
              aria-label="Footer">
              {navigation.main.map(item => (
                <div key={item.name} className="px-5 py-2">
                  {item.local ? (
                    <Link href={item.href} passHref>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50">
                        {item.name}
                      </a>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50">
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8 flex justify-center space-x-6">
              {navigation.social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-gray-500  dark:hover:text-gray-50">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-center text-base text-gray-400">
              &copy; 2021 Rahul Tarak. All rights reserved.
            </p>

            <p className="mt-2 text-center  text-gray-500 text-xs">
              if you are looking for my old more flashy website, checkout {` `}
              <a className="underline" href="https://old.cryogenicplanet.tech">
                old.cryogenicplanet.tech
              </a>
            </p>
          </div>
        </footer>

        <div className="fixed bottom-2 right-2">
          <button
            onClick={() => {
              state.dark = !state.dark
            }}
            type="button"
            className="inline-flex items-center p-2 border transition-colors duration-500 border-transparent rounded-full shadow-sm text-white bg-gray-900 dark:bg-gray-50 dark:text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {state.dark ? (
              <SunIcon className="h-7 w-7 text-black" />
            ) : (
              <MoonIcon className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default view(Layout)
