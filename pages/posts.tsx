import Link from 'next/link'
import React from 'react'

import Layout from '@components/Layout'
import { postBadgeColors, posts as defaultPosts } from '@data/posts'
import { getAllPosts } from '@utils/blog'

const Posts = ({ posts }: { posts: typeof defaultPosts }) => {
  return (
    <Layout title="Posts | Rahul Tarak">
      <div className="py-10 ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold dark:text-gray-200 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              List of Blog Posts
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              My writting is kind of all over the place, and not properly
              centralized.
            </p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 space-y-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
          <div className="w-full">
            <Link href="/" passHref>
              <a
                className="text-gray-800 dark:text-gray-50 pr-3 font-inter text-lg font-medium"
                href="/">{`<< Home`}</a>
            </Link>
          </div>
          {posts.map((post, index) => {
            const colors = postBadgeColors[post.type]

            return (
              <div className="w-full" key={index}>
                <div className="hidden bg-red-100 bg-blue-100 bg-green-100 text-green-800 text-red-800 text-blue-800"></div>
                {post.local ? (
                  <Link href={post.url} passHref>
                    <a
                      className="text-gray-800 dark:text-gray-50 pr-3 font-inter text-lg font-medium"
                      href={post.url}>
                      {post.title}
                    </a>
                  </Link>
                ) : (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-800 dark:text-gray-50 pr-3 font-inter text-lg font-medium"
                    href={post.url}>
                    {post.title}
                  </a>
                )}

                <span
                  className={`inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.foreground} ${colors.background} `}>
                  {post.type}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  // Get all posts again

  try {
    const dynamicPosts = (await getAllPosts()).filter(p => p.published)

    // Find the current blogpost by slug
    const posts = [...defaultPosts]

    dynamicPosts.forEach(dynamicPost => {
      posts.unshift({
        title: dynamicPost.name,
        type:
          dynamicPost.tag.toLowerCase() === ('technical' || 'startup')
            ? (dynamicPost.tag.toLowerCase() as 'technical' | 'startup')
            : 'other',
        url: `/posts/${dynamicPost.slug}`,
        local: true
      })
    })

    return {
      props: {
        posts
      },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
  }
}

export default Posts
