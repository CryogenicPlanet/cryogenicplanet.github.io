import clsx from 'clsx'
import { AppProps } from 'next/app'
import Image from 'next/future/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'

import { Header } from '@components/Header'
import { view } from '@risingstack/react-easy-state'
import { state } from '@utils/store'

import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

import bg from '../public/images/home/bg.jpg'
import bg2 from '../public/images/home/bg2.jpg'
import dubai from '../public/images/home/dubai.jpeg'
import sky from '../public/images/home/sky.jpeg'
import sunset from '../public/images/home/sunsetLandscape.jpeg'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import '@styles/global.css'
import '@styles/animation.css'
import '@styles/prismaTheme.css'
import '@cryogenicplanet/react-notion-x/src/styles.css'

const images = [sky, dubai, sunset, bg2, bg]

function usePrevious(value: string) {
  const ref = useRef<string>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const ModfyApp = ({ Component, pageProps, router }: AppProps) => {
  const pathName = router.pathname
  const previousPathname = usePrevious(pathName)

  const isHome = pathName === '/' || pathName === '/new'

  const [vhMultiplier, setVhMultiplier] = useState(1)

  const resizeHandler = useCallback(() => {
    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    )

    const vh = window.innerHeight
    const multiplier = Math.floor(height / vh)
    setVhMultiplier(multiplier)
  }, [])

  useEffect(() => {
    setVhMultiplier(1)
    setTimeout(() => {
      resizeHandler()
    }, 200)
  }, [pathName, resizeHandler])

  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [resizeHandler])

  return (
    <>
      <div className="absolute inset-0 hidden sm:block max-w-[100vw]">
        <div className="flex flex-col items-center justify-center bg-black">
          {isHome ? (
            <>
              <Image
                src={bg}
                className="object-cover filter blur-lg min-h-screen h-full w-full"
              />
              <Image
                src={bg2}
                className="object-cover filter blur-lg min-h-screen h-full w-full"
              />
            </>
          ) : (
            <>
              {Array(vhMultiplier)
                .fill(0)
                .map((_, index) => {
                  const idx = index % images.length

                  return (
                    <Image
                      key={index}
                      src={images[idx]!}
                      className="object-cover filter blur-lg min-h-screen h-full w-full"
                    />
                  )
                })}
            </>
          )}
        </div>
      </div>

      <div className="relative w-full min-w-[100vw] ">
        <Header />

        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div
              className={clsx(
                'w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900  dark:ring-zinc-300/20 transition-all duration-500 ease-in-out',
                isHome ? 'sm:dark:bg-opacity-60' : '',
                state.showBg && 'sm:dark:bg-opacity-30 opacity-20'
              )}
            />
          </div>
        </div>

        <Toaster position="top-right"></Toaster>
        <main
          className={clsx(
            'relative w-full transition-opacity duration-700 ease-in-out',
            state.showBg && 'opacity-20'
          )}>
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default view(ModfyApp)
