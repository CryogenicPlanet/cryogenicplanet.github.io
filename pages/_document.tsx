import { Head, Html, Main, NextScript } from 'next/document'
import GoogleAnalytics from 'next-simple-google-analytics'

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <GoogleAnalytics id="UA-159985130-1" />
      </Head>
      <body className=" dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
