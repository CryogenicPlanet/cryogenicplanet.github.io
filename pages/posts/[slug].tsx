import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { NotionAPI } from 'notion-client'
import {
  CalloutBlock as CalloutBlockType,
  ExtendedRecordMap
} from 'notion-types'
import { FC } from 'react'
import { CopyBlock, tomorrowNight } from 'react-code-blocks'

import Layout from '@components/Layout'
import PostTitle from '@components/PostTitle'
import RatingComponent, { computeScore } from '@components/Rating'
import { Equation, NotionRenderer } from '@cryogenicplanet/react-notion-x'
import { RawRating } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { getAllPosts, Post } from '@utils/blog'
import { state } from '@utils/store'

const notion = new NotionAPI()

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get all posts again

  if (!params) throw new Error('no params')

  const { slug } = params

  try {
    const posts = await getAllPosts()

    // Find the current blogpost by slug
    const postIndex = posts.findIndex(t => t.slug === slug)

    if (postIndex === -1) {
      return { redirect: { permanent: false, destination: '/404' } }
    }

    const post = posts[postIndex]

    const [recordMap] = await Promise.all([notion.getPage(post!.id)])

    return {
      props: {
        recordMap,
        post
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

const CalloutBlock = ({ block }: { block: CalloutBlockType }) => {
  const icon = block.format.page_icon === '🎬' // Review score block

  if (!icon) return null

  const text = block.properties.title[0]![0]!
  const lines = text.split('\n')

  const rating: RawRating = { Enjoyment: '', Disappointment: '', Quality: '' }

  for (const line of lines) {
    if (line.includes('Enjoyment')) {
      const enjoymentStr = line.replace(/^\D+/g, '')
      if (enjoymentStr) {
        rating.Enjoyment = enjoymentStr
      }
    } else if (line.includes('Quality')) {
      const qualityStr = line.replace(/^\D+/g, '')
      if (qualityStr) {
        rating.Quality = qualityStr
      }
    } else if (line.includes('Disappointment')) {
      const disappointmentStr = line.replace(/^\D+/g, '')
      if (disappointmentStr) {
        rating.Disappointment = disappointmentStr
      }
    }
  }

  return (
    <RatingComponent
      rating={{
        ...rating,
        disappointmentScore: parseInt(rating.Disappointment),
        enjoymentScore: parseInt(rating.Enjoyment),
        qualityScore: parseInt(rating.Quality),
        score: computeScore(rating)
      }}></RatingComponent>
  )
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

const BlogPost: FC<{
  recordMap: ExtendedRecordMap
  post: Post
  ogImage: string
}> = ({
  recordMap,
  post
}: // ogImage
{
  recordMap: ExtendedRecordMap
  post: Post
  ogImage: string
}) => {
  if (!post) return null

  return (
    <>
      <NextSeo
        title={`${post.name} - Rahul Tarak`}
        description={post.preview}
        canonical={`https://cryogenicplanet.tech/post/${post.slug}`}
        twitter={{
          handle: '@cryogenicplanet',
          cardType: 'summary_large_image'
        }}
        openGraph={{
          title: `${post.name.replace(/</g, '⋖').replace(/>/g, '⋗')}`,
          description: post.preview,
          url: `https://cryogenicplanet.tech/post/${post.slug}`,
          images: [
            {
              url: post.staticImage || ''
            }
          ]
        }}></NextSeo>
      <Layout skipSeo={true}>
        <div className="min-h-screen flex flex-col">
          <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-6xl">
            <div className="my-16">
              <div className="py-2 sm:p-8 flex flex-col items-center justify-center  rounded ">
                <div className="notion-page">
                  <PostTitle post={post} />
                </div>
                <NotionRenderer
                  recordMap={recordMap}
                  components={{
                    code: CodeBlock,
                    equation: Equation,
                    callout: CalloutBlock
                  }}
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
  const table = (await getAllPosts()).filter(p => p.slug)

  return {
    paths: table.map(row => `/posts/${row.slug}`),
    fallback: true
  }
}

export default view(BlogPost)
