import { Head, Html, Main, NextScript } from 'next/document'
import GoogleAnalytics from 'next-simple-google-analytics'
import React from 'react'

export default function Document() {
  return (
    <Html>
      <Head>
        <GoogleAnalytics id="UA-159985130-1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
