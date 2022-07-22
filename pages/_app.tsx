import { AppProps } from 'next/app'
import React from 'react'

import 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import '@styles/global.css'
import '@styles/animation.css'
import '@styles/prismaTheme.css'
import '@cryogenicplanet/react-notion-x/src/styles.css'

const ModfyApp = ({ Component, pageProps }: AppProps) => {
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
