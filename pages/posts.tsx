import React from 'react'

import { Card } from '@components/Card'
import Layout from '@components/Layout'
import { SimpleLayout } from '@components/SimpleLayout'
import { posts as defaultPosts } from '@data/posts'
import { Post } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { getAllPosts } from '@utils/blog'
import { formatDate } from '@utils/date'

function PostComponent({ post }: { post: Post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={post.url ? post.url : `/posts/${post.slug}`}>
          {post.name}
        </Card.Title>
        <Card.Eyebrow className="md:hidden" decorate>
          {formatDate(post.date)}
        </Card.Eyebrow>
        <Card.Description>{post.preview}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as={'div'}
        className="mt-1 hidden md:flex md:flex-col justify-start md:items-start md:space-x-0 w-full">
        <span className="text-left">{formatDate(post.date)}</span>
        <span
          className={`inline-flex capitalize items-center text-xs font-medium `}>
          {post.tag}
        </span>
      </Card.Eyebrow>
    </article>
  )
}

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <Layout title="Posts | Rahul Tarak">
      <div className="py-10 w-full">
        <SimpleLayout
          title="Writing on engineering, company building, and other random things."
          intro="All of my long-form thoughts on programming, startups, productivity, and more, collected in chronological order.">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="flex max-w-3xl flex-col space-y-16">
              {posts.map(post => (
                <PostComponent key={post.url} post={post} />
              ))}
            </div>
          </div>
        </SimpleLayout>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  // Get all posts again

  try {
    const dynamicPosts = (await getAllPosts()).filter(p => p.published)

    // Find the current blogpost by slug
    const posts = [...dynamicPosts, ...defaultPosts]

    posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
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

export default view(Posts)
