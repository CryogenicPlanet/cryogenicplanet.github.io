import clsx from 'clsx'
import copy from 'copy-to-clipboard'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'

import { Container } from '@components/Container'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@components/SocialIcons'
import portraitImage from '@images/home/headshot.jpeg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon
}: {
  className?: string
  href: string
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
        {/* @ts-ignore */}
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Rahul Tarak</title>
        <meta name="description" content="Hey, I'm Rahul Tarak. " />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Hey, {`I'm`} Rahul
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                {`I've`} already given the TLDR of who I am, but this is just
                diving a bit deeper. I am a 21 year old (at the time of writing)
                dropout building a startup.
              </p>
              <p>
                {`I've`} been writing code for as long as I can remember
                (probably about 9-10 years now), I used to spend a lot of time
                building random shit and losing hackathons. I love writing code
                as it allows me to break out of systems and really express
                myself (a bit cliche I know)
              </p>
              <p>
                Long before starting my company, I used to work a big long-term
                complicated projects to just name a few:
                <p>
                  - I also wrote a{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.cfrce.com/images/Investigating_the_vertical_ozone_profile_with_a_specific_focus_on_the_ground_level_and_tropospheric_.pdf"
                    className="underline">
                    Research Paper
                  </a>{' '}
                  in high school on Ozone concentration
                </p>
                <p>
                  - I founded {`Bangalore's`} first overnight highschool{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://codefest.oakridge.in/"
                    className="underline">
                    hackathon
                  </a>
                </p>
              </p>
              <p>
                <ul className="text-left space-y-2">
                  <li>
                    - I love making, watching and talking film. Can do it all
                    day, it is like one of my main passions/interest and I find
                    telling powerful stories incredibly fulfilling
                  </li>

                  <li>
                    - I essentially sleep during the day and work in the middle
                    of the night. My co-founder even made a site to track our
                    sleep schedules https://iszacksleeping.com/
                  </li>

                  <li>
                    - Dog parent (have a super cute 1 year old golden retriever,
                    who acts as the emotional support co-founder)
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul>
              <SocialLink href="https://cryo.wtf/t" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://cryo.wtf/g"
                icon={GitHubIcon}
                className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://cryo.wtf/l"
                icon={LinkedInIcon}
                className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <button
                onClick={() => {
                  copy('hey@cryo.wtf')
                  toast.success('Copied email to clipboard')
                }}
                className="mt-8 border-t  space-x-2 border-zinc-100 pt-8 dark:border-zinc-700/40 group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
                <MailIcon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
                <span>hey@cryo.wtf</span>
              </button>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
