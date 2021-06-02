import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import React, { FC } from 'react'
import { Code, Equation, NotionRenderer } from 'react-notion-x'

import Layout from '@components/Layout'
import PostTitle from '@components/PostTitle'
import { view } from '@risingstack/react-easy-state'
import { getAllPosts, Post } from '@utils/blog'
import { state } from '@utils/store'

const notion = new NotionAPI()

export const getStaticProps = async ({
  params: { slug }
}: {
  params: { slug: string }
}) => {
  // Get all posts again

  try {
    const posts = await getAllPosts()

    // Find the current blogpost by slug
    const postIndex = posts.findIndex(t => t.slug === slug)
    const post = posts[postIndex]

    const recordMap = await notion.getPage(post!.id)

    return {
      props: {
        recordMap,
        post
      },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
  }
}

const BlogPost: FC<{
  recordMap: ExtendedRecordMap
  post: Post
}> = ({ recordMap, post }: { recordMap: ExtendedRecordMap; post: Post }) => {
  if (!post) return null

  return (
    <>
      <Layout title={`${post.name} - Rahul's Blog`}>
        <div className="min-h-screen flex flex-col">
          <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-6xl">
            <div className="my-16">
              <div className="py-2 sm:p-8 flex flex-col items-center justify-center  rounded ">
                <div className="notion-page">
                  <PostTitle post={post} />
                </div>
                <NotionRenderer
                  recordMap={recordMap}
                  components={{ code: Code, equation: Equation }}
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
