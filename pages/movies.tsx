import Link from 'next/link'
import { useMemo } from 'react'

import { Card } from '@components/Card'
import Layout from '@components/Layout'
import { RewatchTag } from '@components/Movie'
import { SmallRatingComponent } from '@components/Rating'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Movie } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { getAllMovies } from '@utils/blog'

import { getPoster } from './api/movies/poster'

export const Movies = view(({ reviews }: { reviews: Movie[] }) => {
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
                {atTheatre.length} are movies I watched in a theatre out of the{' '}
                {twentyTwentyTwo.length} movies I watched released this year
              </p>
            </Disclosure.Panel>
          </Disclosure>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 space-y-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
        <ul className="grid p-6 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
          {reviews.map(review => {
            const date = new Date(review.Seen)
            return (
              <Card as="li" key={review.id} className="w-full">
                <img
                  className="w-full object-contain h-auto"
                  src={review.poster}
                  alt=""
                />
                <div className="flex-1 flex flex-col w-full justify-end">
                  <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-teal-500">
                    <Card.Link href={`/movies/${review.Name}/${review.id}`}>
                      {review.Name}
                    </Card.Link>
                  </h2>
                  <Card.Description className="w-full">
                    <SmallRatingComponent rating={{ ...review }} />
                  </Card.Description>
                  <div className="relative w-full z-20 mt-6 flex items-center text-sm font-medium text-zinc-400 dark:text-zinc-200">
                    <div className="flex w-full max-w-[50%] items-center">
                      <div className="flex space-x-2">
                        <RewatchTag reWatch={review.Rewatch}></RewatchTag>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-end divide-x-2 divide-gray-500 divide-opacity-30 group-hover:text-teal-500">
                      <p className="px-2 capitalize ">
                        {date.toLocaleString('default', {
                          month: 'long'
                        })}{' '}
                        {date.getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </ul>
      </div>
    </div>
  )
})

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
          const poster = await getPoster({
            name: m.Name,
            release2022: m['2022 Release'] ? 'true' : 'false'
          })

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

const MoviePage = ({ reviews }: { reviews: Movie[] }) => {
  return (
    <Layout
      title="Movies | Rahul Tarak"
      description="List of movies I've watched since 2022"
      ogImage="https://user-images.githubusercontent.com/10355479/178099683-6ebf7d20-9e8e-4c9a-b7ba-689ddbc221dd.png">
      <Movies reviews={reviews}></Movies>
    </Layout>
  )
}

export default MoviePage
