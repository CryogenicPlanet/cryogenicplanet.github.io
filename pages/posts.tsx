import React from 'react'

import { Card } from '@components/Card'
import { Container } from '@components/Container'
import Layout from '@components/Layout'
import { posts as defaultPosts } from '@data/posts'
import { Post } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { getAllPosts } from '@utils/blog'

import { formatDate } from './new'

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

export function SimpleLayout({
  title,
  intro,
  children
}: {
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
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
