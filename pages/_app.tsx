import Blobity from 'blobity'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'

import { defaultConfig } from '@components/Blobity'
import { state } from '@utils/store'

import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

import '@styles/global.css'
import '@styles/animation.css'
import '@styles/prismaTheme.css'
// import 'prismjs/themes/prism-okaidia.css'
import '@cryogenicplanet/react-notion-x/src/styles.css'

const ModfyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (!state.noGlobalBlobity) {
      console.log('Created blobity from _app')
      state.blobity = new Blobity(defaultConfig)
    }
  }, [])

  return (
    <>
      {/* https://www.radix-ui.com/docs/primitives/utilities/id-provider
          This is too keep the ids consistent between ssr and client
        */}

      <Component {...pageProps} />
    </>
  )
}

export default ModfyApp
