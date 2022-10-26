import { Head, Html, Main, NextScript } from 'next/document'
import GoogleAnalytics from 'next-simple-google-analytics'

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <GoogleAnalytics id="UA-159985130-1" />
      </Head>
      <body className="flex h-full flex-col bg-gradient-to-tr bg-fixed from-gray-700 via-gray-900 to-black dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
