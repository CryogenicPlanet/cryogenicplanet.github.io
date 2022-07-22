import copy from 'copy-to-clipboard'
import Link from 'next/link'
import * as React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Keyframes, Scroll } from 'scrollex'

import Layout from '@components/Layout'
import { navigation } from '@data/navigation'
import { Transition } from '@headlessui/react'

const keyframes: Record<string, Keyframes> = {
  headerText: ({ section }) => ({
    [section.topAt('container-top')]: {
      translateY: 200
    },
    [section.bottomAt('container-top')]: {
      translateY: -200
    }
  }),
  headerImage: ({ section }) => ({
    [section.topAt('container-top')]: {
      translateY: 0
    },
    [section.bottomAt('container-top')]: {
      translateY: 125
    }
  }),
  galleryImage: ({ section, data }) => ({
    [section.topAt('container-top')]: {
      translateZ: data.initialZ
    },
    [section.bottomAt('container-bottom')]: {
      translateZ: data.initialZ + 510
    }
  }),
  footerText: ({ section }) => ({
    [section.topAt('container-bottom')]: {
      translateY: 200
    },
    [section.bottomAt('container-bottom')]: {
      translateY: 0
    }
  }),
  staggeredItem: ({ data }) => ({
    [data.index * 150]: {
      opacity: 0
    },
    [data.index * 150 + 1]: {
      opacity: 1
    }
  })
}

export default function App({
  images
}: {
  images: {
    x: number
    y: number
    z: number
    src: string
  }[]
}) {
  const [bio, setBio] = useState(false)

  return (
    <Scroll.Container
      scrollAxis="y"
      className="h-screen w-screen text-green-500 bg-gray-900">
      <Scroll.Section className="h-screen relative">
        <Scroll.Item
          keyframes={keyframes.headerImage}
          className="absolute inset-0">
          <img
            alt="bg"
            className="object-cover filter blur-lg h-full w-full transform scale-125"
            src="/images/graded/P1530184.jpeg"
          />
        </Scroll.Item>
        <div className="flex w-full px-8 lg:py-0 py-8 h-full justify-center items-center">
          <Scroll.Item keyframes={keyframes.headerText}>
            <p className="text-9xl backdrop-blur-md	 filter text-gray-50 text-opacity-75">
              Hey, {`I'm`} Rahul
            </p>

            <Scroll.Item
              data={{ index: 0 }}
              keyframes={keyframes.staggeredItem}>
              <p className="text-3xl backdrop-blur-md py-4 filter text-gray-50 text-opacity-75">
                {`I'm`} a founder, engineer, photography, filmmaker and
                technologist - this is my little corner of the internet.
              </p>
            </Scroll.Item>
            <Scroll.Item
              data={{ index: 1 }}
              keyframes={keyframes.staggeredItem}>
              <p className="text-2xl backdrop-blur-md filter text-gray-50 text-opacity-75">
                Most of the time I am building my{' '}
                <a className="underline" href="https://modfy.video">
                  company
                </a>
                , when I am not, I hack on random{' '}
                <Link href="/things" passHref>
                  <a className="underline" href="/things">
                    things
                  </a>
                </Link>{' '}
                or take{' '}
                <Link href="/photos" passHref>
                  <a className="underline" href="/photos">
                    photos.
                  </a>
                </Link>
              </p>
            </Scroll.Item>
            <Scroll.Item
              data={{ index: 2 }}
              keyframes={keyframes.staggeredItem}>
              <p className="text-xl backdrop-blur-md py-4 filter text-gray-50 text-opacity-75">
                Occasionally, I{' '}
                <Link href="/posts" passHref>
                  <a className="underline" href="/posts">
                    write my rambly thoughts
                  </a>
                </Link>{' '}
                about things or talk about{' '}
                <Link href="/movies" passHref>
                  <a className="underline" href="/movies">
                    the movies I love (or hate)
                  </a>
                </Link>
                , sometimes even make{' '}
                <a className="underline" href="https://youtube.com/">
                  {' '}
                  my own short films.
                </a>
              </p>
            </Scroll.Item>
          </Scroll.Item>
        </div>
      </Scroll.Section>
      <Scroll.Section style={{ height: '500vh' }}>
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ perspective: 600 }}>
          {images.map(image => {
            return (
              <Scroll.Item
                key={image.src}
                keyframes={keyframes.galleryImage}
                className="absolute inset-0 grid  place-items-center"
                style={{ left: image.x, top: image.y }}
                data={{ initialZ: image.z }}>
                <img
                  alt="scroll"
                  src={image.src}
                  className="object-cover h-64"
                />
              </Scroll.Item>
            )
          })}
        </div>
      </Scroll.Section>

      <Layout title="Rahul Tarak">
        <div className="relative  py-16 sm:py-24">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
            <div className="relative sm:py-16 lg:py-0">
              <div
                aria-hidden="true"
                className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                <div className="absolute inset-y-0 right-1/2 w-full bg-transparent rounded-r-3xl lg:right-72" />
                <svg
                  className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392">
                  <defs>
                    <pattern
                      id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse">
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-300"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={392}
                    fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                  />
                </svg>
              </div>
              <div className="relative mx-auto max-w-md px-4 flex justify-center items-center sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                <button
                  onClick={() => {
                    setBio(c => !c)
                  }}
                  className="relative  w-full pb-10 rounded-2xl  overflow-hidden">
                  <Transition
                    show={bio}
                    className="w-full h-full flex justify-center items-center"
                    enter="transition-opacity duration-75 delay-200 ease-in-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Bio></Bio>
                  </Transition>

                  <Transition
                    show={!bio}
                    className="w-full h-full pt-64 shadow-xl"
                    enter="transition-opacity duration-75 delay-150 ease-in-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150 ease-in-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute pointer-events-none inset-0 bg-indigo-500 mix-blend-multiply" />
                    <img
                      className="absolute pointer-events-none inset-0 h-full w-full object-cover"
                      src="/images/graded/P1520366.jpeg"
                      alt="headshot"
                    />
                    <div className="absolute pointer-events-none inset-0 bg-gradient-to-t from-indigo-600 via-indigo-600 opacity-50" />
                    <div className="relative px-8">
                      <div></div>
                      <div className="py-20"></div>
                    </div>
                  </Transition>
                </button>
              </div>
            </div>

            <Links></Links>
          </div>
        </div>
      </Layout>
    </Scroll.Container>
  )
}

const Bio = () => {
  return (
    <div className="bg-white overflow-y-auto w-full h-full px-4 space-y-2 py-8 text-gray-900 flex flex-col items-start justify-center shadow-md rounded-lg max-w-md max-h-[500px] sm:max-w-3xl">
      <p className="text-lg text-left">
        This is just a bit more about me (slightly hidden so it is not as
        narcissistic?)
      </p>
      <p className="text-left">
        {`I've`} already given the TLDR of who I am, but this is just diving a
        bit deeper. I am a 21 year old (at the time of writing) dropout building
        a startup.
      </p>
      <p className="text-left">
        {`I've`} been writing code for as long as I can remember (probably about
        9-10 years now), I used to spend a lot of time building random shit and
        losing hackathons. I love writing code as it allows me to break out of
        systems and really express myself (a bit cliche I know)
      </p>
      <p className="text-left">
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
        I am also part of a few prestigious communities:
        <ul className="text-left">
          <li>- Pioneer.app</li>
          <li>- Ondeck (ODX1)</li>
          <li>- Interact</li>
        </ul>
      </p>
    </div>
  )
}

const Links = () => {
  return (
    <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
      {/* Content area */}
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <div className="mt-6 font-semibold text-gray-800 dark:text-gray-50 space-y-3">
          <p className="text-4xl">Links and stuff</p>
          <p className="text-xl leading-7">
            <Link href="/things" passHref>
              <a href="/things">- My random hacks</a>
            </Link>
          </p>
          <p className="text-xl leading-7">
            <Link href="/photos" passHref>
              <a href="/photos">- My photos</a>
            </Link>
          </p>
          <p className="text-xl leading-7">
            <Link href="/posts" passHref>
              <a href="/posts">- My rambly thoughts</a>
            </Link>
          </p>
          <p className="text-xl leading-7">
            <Link href="/movies" passHref>
              <a href="/movies">- My thoughts on movies</a>
            </Link>
          </p>
          <p className="text-xl inline-flex flex-col justify-center space-y-1 items-start leading-7">
            <p>Love talking to founders, students, hackers -</p>
            <button
              onClick={() => {
                copy('rahul@modfy.video')
                toast.success('Copied email to clipboard')
              }}
              className="font-bold underline focus:outline-none">
              rahul@modfy.video
            </button>
          </p>
          <div className="pt-8 flex justify-start space-x-6">
            {navigation.social.map(item => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-500  dark:hover:text-gray-50">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-8 w-8" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mt-10">
        <div className="mt-10">
          <a
            href="https://modfy.video"
            className="text-xl font-medium text-indigo-600 dark:text-indigo-500">
            Learn more about how we are reinventing video editing{' '}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const scrollImages = [
    {
      x: -600,
      y: -500,
      z: -200,
      src: `/images/graded/P1530278.jpeg`
    },
    {
      x: 600,
      y: -500,
      z: -100,
      src: `/images/graded/P1520287.jpeg`
    },
    {
      x: 0,
      y: -100,
      z: 0,
      src: `/images/graded/P1520002.jpeg`
    },
    {
      x: -450,
      y: 300,
      z: 100,
      src: `/images/graded/P1530790.jpeg`
    },
    {
      x: 400,
      y: 250,
      z: 200,
      src: `/images/graded/P1540095.jpeg`
    }
  ]

  return {
    props: {
      images: scrollImages
    }
  }
}
