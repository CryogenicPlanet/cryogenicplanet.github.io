import Link from 'next/link'
import React, { useMemo } from 'react'

import Layout from '@components/Layout'
import { PlatformTag, RewatchTag, WhereWatchTag } from '@components/Movie'
import { SmallRatingComponent } from '@components/Rating'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Movie } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { getAllMovies } from '@utils/blog'

const Movies = ({ reviews }: { reviews: Movie[] }) => {
  const uniqueMovies = useMemo(
    () => Array.from(new Set(reviews.map(review => review.Name.toUpperCase()))),
    [reviews]
  )

  const firstWatch = reviews.filter(review => review.Rewatch !== true)
  const reWatch = reviews.filter(review => review.Rewatch === true)

  const atTheatre = reviews.filter(
    review =>
      review['Device/Location'] === '🪑Theatre' ||
      review['Device/Location'] === '💺Imax' ||
      review['Device/Location'] === '🛋️ Private theatre'
  )

  const twentyTwentyTwo = reviews.filter(
    review => review['2022 Release'] === true
  )

  return (
    <Layout
      title="Movies | Rahul Tarak"
      description="List of movies I've watched since 2022"
      ogImage="https://user-images.githubusercontent.com/10355479/178099683-6ebf7d20-9e8e-4c9a-b7ba-689ddbc221dd.png">
      <div className="py-10 ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold dark:text-gray-200 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              List of Movies {`I've`} watched
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              This is a list of movie {`I've`} watched rated in my new{' '}
              <Link href="/posts/rating">
                <a
                  href="/posts/rating"
                  className="text-gray-800 underline z-10 dark:text-gray-50 pr-3 font-inter text-lg font-medium">
                  rating format
                </a>
              </Link>
            </p>
            <p className="max-w-xl mx-auto text-base text-gray-500">
              Started properly tracking since 2020, more movies on my{' '}
              <a
                target="_blank"
                href="https://letterboxd.com/CryogenicPlanet/"
                className="text-gray-800 underline z-10 dark:text-gray-50 pr-3 font-inter text-base font-medium"
                rel="noreferrer">
                letterbox
              </a>
            </p>

            <Disclosure>
              <Disclosure.Button className="max-w-3xl mt-2 mx-auto text-base text-gray-500 flex space-x-2">
                So far this year {`I've`} seen {reviews.length} movies.
                <span className="flex pl-2 hover:text-gray-300 items-center space-x-2">
                  More stats
                  <ChevronDownIcon className="w-4 h-4"></ChevronDownIcon>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="text-gray-500 flex flex-col text-left justify-start max-w-xl mx-auto px-20">
                <p className="max-w-xl mt-2 text-base text-gray-400">
                  Out of which {uniqueMovies.length} are unique.
                </p>

                <p className="max-w-xl mt-2 text-base text-gray-400">
                  {firstWatch.length} are movies {`I've`} watched for the first
                  time this year
                </p>
                <p className="max-w-xl mt-2 text-base text-gray-400">
                  {reWatch.length} are movies I rewatched this year.
                </p>
                <p className="max-w-xl mt-2 text-base text-gray-400">
                  {atTheatre.length} are movies I watched in a theatre out of
                  the {twentyTwentyTwo.length} movies I watched released this
                  year
                </p>
              </Disclosure.Panel>
            </Disclosure>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 space-y-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
            {reviews.map((review, index) => {
              const date = new Date(review.Seen)
              return (
                <li
                  className="col-span-1 bg-zinc-800 flex flex-col items-center w-full rounded-lg shadow divide-y divide-zinc-700 divide-opacity-50"
                  key={index}>
                  <Link href={`/movies/${review.Name}/${review.id}`} passHref>
                    <a
                      href={`/movies/${review.Name}/${review.id}`}
                      className="col-span-1 bg-zinc-800 flex flex-col items-center w-full rounded-lg shadow divide-y divide-zinc-700 divide-opacity-50">
                      <div className="w-full flex flex-col items-center justify-between p-6 space-y-2">
                        <img
                          className="aspect-w-16 max-w-[248px]"
                          src={review.poster}
                          alt=""
                        />
                        <div className="flex-1 w-full">
                          <div className="flex justify-start items-center space-x-3">
                            <h3 className="text-gray-300 text-sm font-medium truncate">
                              {review.Name}
                            </h3>
                          </div>
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex justify-start items-center space-x-3">
                            <h3 className="text-gray-400 text-sm font-medium truncate">
                              {date.toLocaleString('default', {
                                month: 'long'
                              })}{' '}
                              {date.getFullYear()}
                            </h3>
                          </div>
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex justify-start items-center space-x-3">
                            <h3 className="text-gray-900 text-sm font-medium truncate">
                              <RewatchTag reWatch={review.Rewatch}></RewatchTag>
                            </h3>
                          </div>
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex justify-start items-center space-x-3">
                            <h3 className="text-gray-400 text-sm font-medium truncate">
                              <PlatformTag
                                platform={
                                  review['Device/Location']
                                }></PlatformTag>
                            </h3>
                          </div>
                        </div>

                        <div className="flex-1 w-full">
                          <div className="flex justify-start items-center space-x-3">
                            <h3 className="text-gray-400 text-sm font-medium  flex space-x-2 overflow-auto">
                              {review['Where did you watch'].map(
                                (where, index) => {
                                  return (
                                    <WhereWatchTag
                                      key={index}
                                      platform={where}></WhereWatchTag>
                                  )
                                }
                              )}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="-mt-px p-4 flex divide-x divide-zinc-800">
                          {review.Tier !== 'Meta' && (
                            <SmallRatingComponent
                              rating={{ ...review }}></SmallRatingComponent>
                          )}
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  try {
    const reviews = (await getAllMovies())
      .filter(m => m.Tier !== "Didn't finish - Not necessarily bad")
      .sort((a, b) => {
        return new Date(b.Seen).getTime() - new Date(a.Seen).getTime()
      })
      .map(async m => {
        try {
          if (m.posterOverwrite) return { ...m, poster: m.posterOverwrite }
          const data = await fetch(
            `https://omdbapi.com/?apikey=1d933979&s=${m.Name}&type=movie&${
              m['2022 Release'] ? 'y=2022' : ''
            }`
          ).then(res => res.json())

          const poster = data.Search[0].Poster

          if (!poster) return m

          return { ...m, poster: poster }
        } catch (err) {
          return m
        }
      })

    return {
      props: {
        reviews: await Promise.all(reviews)
      },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
  }
}

export default view(Movies)
