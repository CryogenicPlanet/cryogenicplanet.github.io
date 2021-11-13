import Blobity from 'blobity'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { NotionAPI } from 'notion-client'
import {
  CalloutBlock as CalloutBlockType,
  ExtendedRecordMap
} from 'notion-types'
import React, { FC, useEffect } from 'react'
import { CopyBlock, tomorrowNight } from 'react-code-blocks'

import { defaultConfig } from '@components/Blobity'
import Layout from '@components/Layout'
import RatingComponent from '@components/Rating'
import RatingTitle from '@components/RatingTitle'
import { Equation, NotionRenderer } from '@cryogenicplanet/react-notion-x'
import { Rating } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { getAllReviews, Review } from '@utils/blog'
import { getSlug } from '@utils/review'
import { state } from '@utils/store'

const notion = new NotionAPI()

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get all posts again

  if (!params) throw new Error('no params')

  const { slug } = params

  try {
    const reviews = await getAllReviews()

    // Find the current blogpost by slug
    const postIndex = reviews.findIndex(t => getSlug(t) === slug)

    if (postIndex === -1) {
      return { redirect: { permanent: false, destination: '/404' } }
    }

    const review = reviews[postIndex]

    const [recordMap] = await Promise.all([notion.getPage(review!.id)])

    return {
      props: {
        recordMap,
        review: review
      },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
    return {
      redirect: { permanent: false, destination: '/404' }
    }
  }
}

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  return (
    <div className="w-full">
      <CopyBlock
        text={code}
        language={language}
        showLineNumbers={false}
        theme={tomorrowNight}
        codeBlock
      />
    </div>
  )
}

const CalloutBlock = ({ block }: { block: CalloutBlockType }) => {
  const icon = block.format.page_icon === '🎬' // Review score block

  if (!icon) return null

  const text = block.properties.title[0][0]
  const lines = text.split('\n')

  const rating: Rating = { disappointment: 0, enjoyment: 0, quality: 0 }

  for (const line of lines) {
    if (line.includes('Enjoyment')) {
      const enjoymentStr = line.replace(/^\D+/g, '')
      if (enjoymentStr) {
        rating.enjoyment = parseFloat(enjoymentStr)
      }
    } else if (line.includes('Quality')) {
      const qualityStr = line.replace(/^\D+/g, '')
      if (qualityStr) {
        rating.quality = parseFloat(qualityStr)
      }
    } else if (line.includes('Disappointment')) {
      const disappointmentStr = line.replace(/^\D+/g, '')
      const negative = line.includes('-') ? -1 : 1
      if (disappointmentStr) {
        rating.disappointment = parseFloat(disappointmentStr) * negative
      }
    }
  }

  console.log({ rating })

  return <RatingComponent rating={rating}></RatingComponent>
}

const ReviewPost: FC<{
  recordMap: ExtendedRecordMap
  review: Review
  ogImage: string
}> = ({
  recordMap,
  review
}: // ogImage
{
  recordMap: ExtendedRecordMap
  review: Review
  ogImage: string
}) => {
  useEffect(() => {
    state.blobity?.destroy()
    console.log('Destroyed blobity')
    state.blobity = null
    state.noGlobalBlobity = true

    return () => {
      console.log('Created blobity')
      state.blobity = new Blobity(defaultConfig)
      state.noGlobalBlobity = false
    }
  }, [])

  if (!review) return null

  return (
    <>
      <NextSeo
        title={`${review.name} - Rahul Tarak`}
        description={review.preview}
        canonical={`https://cryogenicplanet.tech/reviews/${review.name}`}
        twitter={{
          handle: '@cryogenicplanet',
          cardType: 'summary_large_image'
        }}
        openGraph={{
          title: `${review.name.replace(/</g, '⋖').replace(/>/g, '⋗')}`,
          description: review.preview,
          url: `https://cryogenicplanet.tech/reviews/${review.name}`,
          images: [
            {
              url: review.staticImage || ''
            }
          ]
        }}></NextSeo>
      <Layout skipSeo={true}>
        <div className="min-h-screen flex flex-col">
          <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-6xl">
            <div className="my-16">
              <div className="py-2 sm:p-8 flex flex-col items-center justify-center  rounded ">
                <div className="notion-page">
                  <RatingTitle review={review} />
                </div>
                <NotionRenderer
                  components={{
                    code: CodeBlock,
                    equation: Equation,
                    callout: CalloutBlock
                  }}
                  recordMap={recordMap}
                  darkMode={state.dark}
                  fullPage={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const table = (await getAllReviews()).filter(p => p.name)

  return {
    paths: table.map(row => `/reviews/${getSlug(row)}`),
    fallback: true
  }
}

export default view(ReviewPost)
