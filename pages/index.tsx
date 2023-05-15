import copy from 'copy-to-clipboard'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { isMobile } from 'react-device-detect'
import toast from 'react-hot-toast'

import { Button } from '@components/Button'
import { Card } from '@components/Card'
import { TinyRatingComponent } from '@components/Rating'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@components/SocialIcons'
import {
  CameraIcon,
  FilmIcon,
  LinkIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import image5 from '@images/home/beach.jpeg'
import image4 from '@images/home/boat.jpeg'
import avatarImage from '@images/home/headshot.jpeg'
import image2 from '@images/home/stark.jpeg'
import image3 from '@images/home/sunset.jpeg'
import { Movie, Post } from '@interfaces/index'
import { getAllPosts } from '@utils/blog'
import { clsx, formatDate } from '@utils/date'
import { getReviews } from '@utils/reviews'

const description = `I’m Rahul, an entrepreneur and engineer based in Bangalore.
Currently building scalar.video, where we reinventing video
editing to be more collaborative and accessible`

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        fill="currentColor"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        fill="currentColor"
      />
    </svg>
  )
}

function Posts({ post }: { post: Post }) {
  return (
    <Card as="article">
      <Card.Title href={`/posts/${post.slug}`}>{post.name}</Card.Title>
      <Card.Eyebrow as="time" decorate>
        {formatDate(post.date)}
      </Card.Eyebrow>
      <Card.Description>{post.preview}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    // @ts-expect-error
    <Link className="group -m-1 p-1" {...props}>
      {/* @ts-ignore */}
      <Icon className="h-6 w-6 fill-zinc-500 text-zinc-400 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Contact() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">
          Love talking to founders, students, hackers
        </span>
      </h2>

      <div className="mt-6 flex">
        <Button
          onClick={() => {
            copy('hey@cryo.wtf')
            toast.success('Copied email to clipboard')
          }}
          className="ml-4 flex-none">
          hey@cryo.wtf
        </Button>
      </div>
    </div>
  )
}

function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="rounded-2xl hidden sm:block border border-zinc-100 p-6 dark:border-zinc-700/40">
      <Link
        href="/movies"
        className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <FilmIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Recent movies watched</span>
      </Link>
      <ol className="mt-6 space-y-4">
        {movies.map((movie, roleIndex) => {
          return (
            <li key={roleIndex} className="flex gap-4 ">
              <Link
                href={`/movies/${movie.Name}/${movie.id}`}
                className="flex flex-col  space-y-1 w-full hover:bg-zinc-700 p-2 px-4 rounded-lg">
                <dl className="flex flex-auto flex-wrap gap-x-2">
                  <dt className="sr-only">Title</dt>
                  <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {movie.Name}
                  </dd>
                </dl>
                <TinyRatingComponent rating={movie}></TinyRatingComponent>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Links() {
  const resume = [
    {
      title: 'My company',
      logo: BriefcaseIcon,
      link: 'https://scalar.video'
    },
    {
      title: 'My random hacks',
      logo: WrenchScrewdriverIcon,
      link: '/things'
    },
    {
      title: 'My Photos',
      logo: CameraIcon,
      link: '/photos'
    },
    {
      title: 'My thoughts on movies',
      logo: FilmIcon,
      link: '/movies'
    }
  ] as const

  return (
    <div className="rounded-2xl hidden sm:block border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <LinkIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Links and stuff</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4 ">
            <a
              href={role.link}
              className="flex items-center space-x-2 w-full hover:bg-zinc-900 p-2 px-4 rounded-lg">
              <div className="relative flex flex-none items-center justify-center rounded-full shadow-md ">
                <role.logo className="h-7 w-7 bg-transparent text-gray-300" />
              </div>
              <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Title</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {role.title}
                </dd>
              </dl>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Photos() {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2'
  ]

  return (
    <div className="mt-16 sm:mt-52">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image2, image3, image4, image5]
          .concat(isMobile ? [image5] : [])
          .map((image, imageIndex) => (
            <div
              key={`${image.src}-${imageIndex}`}
              className={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                rotations[imageIndex % rotations.length]
              )}>
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function Home({
  posts,
  movies
}: {
  posts: Post[]
  movies: Movie[]
}) {
  return (
    <div className="dark">
      <Head>
        <title>Rahul Tarak - Founder, engineer, and amateur filmmaker.</title>
        <meta name="description" content={description} />
        <meta
          name="og:image"
          content="https://user-images.githubusercontent.com/10355479/238221217-0199f17c-8f20-4e9e-b64b-dec0e2a625e7.jpeg"
        />
        <meta
          name="og:title"
          content="Rahul Tarak - Founder, engineer, and amateur filmmaker."
        />
        <meta name="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex flex-col sm:min-h-screen">
        <div className="flex justify-center w-full sm:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:space-y-0 space-y-8 pb-8 w-full max-w-7xl lg:px-8">
            <div className="flex-1 flex items-center w-full h-full">
              <div className="sm:px-8">
                <div className="mx-auto max-w-7xl lg:px-8">
                  <div className="sm:h-64 sm:w-64 h-32 w-32">
                    <Image
                      src={avatarImage}
                      alt=""
                      sizes="(min-width: 640px) 18rem, 11rem"
                      className={clsx(
                        'rounded-full w-full h-auto max-h-32 sm:max-h-64 bg-zinc-100 object-cover dark:bg-zinc-800'
                      )}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="max-w-2xl">
                  <p className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    Founder, engineer, and amateur filmmaker.
                  </p>
                  <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    {description}
                  </p>
                  <div className="mt-6 flex gap-6">
                    <SocialLink
                      href="https://cryo.wtf/t"
                      aria-label="Follow on Twitter"
                      icon={TwitterIcon}
                    />
                    <SocialLink
                      href="https://cryo.wtf/g"
                      aria-label="Follow on GitHub"
                      icon={GitHubIcon}
                    />
                    <SocialLink
                      href="https://cryo.wtf/l"
                      aria-label="Follow on LinkedIn"
                      icon={LinkedInIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Photos />
      </div>
      <div className="sm:px-8 mt-8 sm:-mt-32">
        <div className="mx-auto max-w-7xl lg:px-8 ">
          <div className="bg-zinc-900 bg-opacity-80">
            <div className={clsx('relative px-4 py-20 sm:px-8 lg:px-12')}>
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                  <div className="flex flex-col gap-16">
                    {posts.map(post => (
                      <Posts key={post.slug} post={post} />
                    ))}
                  </div>
                  <div className="space-y-10 lg:pl-16 xl:pl-24">
                    <Links />
                    <Contact />
                    <Movies movies={movies} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  // Get all posts again

  try {
    const dynamicPosts = (await getAllPosts()).filter(p => p.published)

    dynamicPosts.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)

      return bDate.getTime() - aDate.getTime()
    })

    const { reviews } = await getReviews()

    const posts = dynamicPosts.slice(0, 5)

    return {
      props: {
        posts: posts,
        movies: reviews.slice(0, 5)
      },
      revalidate: 1
    }
  } catch (e) {
    console.error(e)
  }
}
