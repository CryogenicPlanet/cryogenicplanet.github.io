import clsx from 'clsx'
import { AppProps } from 'next/app'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Toaster } from 'react-hot-toast'

import { Header } from '@components/Header'
import { view } from '@risingstack/react-easy-state'
import { classNames } from '@utils/classNames'
import { state } from '@utils/store'
import {
  useIsomorphicLayoutEffect,
  useScrollHeight,
  useWindowSize
} from '@utils/useWindowSize'
import { Analytics } from '@vercel/analytics/react'

import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

import mysuru from '../public/images/home/bg.jpg'
import dubaiBeach from '../public/images/home/bg2.jpg'
import dubai from '../public/images/home/dubai.jpeg'
import bg from '../public/images/home/experimental.jpeg'
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
import '@tremor/react/dist/esm/tremor.css'

const images = [sky, dubai, sunset, dubaiBeach, mysuru]

const randomImage = () => {
  const idx = Math.floor(Math.random() * images.length)

  return idx < images.length ? images[idx]! : images[0]!
}

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

  const scrollHeight = useScrollHeight()
  const { height } = useWindowSize()

  const [vhMultiplier, setVhMultiplier] = useState(-1)

  useIsomorphicLayoutEffect(() => {
    if (vhMultiplier !== -1) return

    const multiplier = Math.floor(scrollHeight / height)

    if (multiplier > 0) setVhMultiplier(multiplier)
  }, [height, scrollHeight])

  return (
    <div className="grid bg-zinc-900 sm:bg-black">
      <div
        className={classNames(
          'stackedLayer relative bg-cover min-h-screen bg-center bg-fixed	w-full overflow-x-hidden',
          isHome ? '' : 'filter blur-md'
        )}
        style={
          isMobile
            ? {}
            : {
                backgroundImage: isHome
                  ? `url(${bg.src})`
                  : `url(${randomImage().src})`
              }
        }></div>
      <div className="relative stackedLayer  w-full overflow-x-hidden ">
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

        <Analytics></Analytics>

        <Toaster position="top-right"></Toaster>
        <main
          className={clsx(
            'relative  w-full transition-opacity duration-700 ease-in-out',
            state.showBg && 'opacity-20'
          )}>
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
      </div>
    </div>
  )
}

export default view(ModfyApp)
