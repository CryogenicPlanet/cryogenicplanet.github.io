import { AppProps } from 'next/app'
import Image from 'next/future/image'
import React, { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'

import { Header } from '@components/Header'

import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

import bg from '../public/images/home/bg.jpg'
import bg2 from '../public/images/home/bg2.jpg'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import '@styles/global.css'
import '@styles/animation.css'
import '@styles/prismaTheme.css'
import '@cryogenicplanet/react-notion-x/src/styles.css'

function usePrevious(value: string) {
  const ref = useRef<string>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const ModfyApp = ({ Component, pageProps, router }: AppProps) => {
  const previousPathname = usePrevious(router.pathname)

  return (
    <>
      <div className="absolute inset-0 hidden sm:block max-w-[100vw]">
        <div className="flex flex-col items-center justify-center bg-black">
          <Image
            src={bg}
            className="object-cover filter blur-lg min-h-screen h-full w-full"
          />
          <Image
            src={bg2}
            className="object-cover filter blur-lg min-h-screen h-full w-full"
          />
        </div>
      </div>

      <div className="relative w-full min-w-[100vw]">
        <Header />

        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 sm:dark:bg-opacity-60 dark:ring-zinc-300/20" />
          </div>
        </div>

        <Toaster position="top-right"></Toaster>
        <main className="relative w-full">
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default ModfyApp
