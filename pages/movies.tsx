import Link from 'next/link'
import React from 'react'

import A from '@components/Blobity'
import Layout from '@components/Layout'
import { SmallRatingComponent } from '@components/Rating'
import { Movie } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { getAllMovies } from '@utils/blog'

const Movies = ({ reviews }: { reviews: Movie[] }) => {
  return (
    <Layout title="Movies | Rahul Tarak">
      <div className="py-10 ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold dark:text-gray-200 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              List of Movies {`I've`} watched
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              This is a list of movie {`I've`} watched rated in my new{' '}
              <Link href="/posts/rating">
                <A
                  dataOptions={{ radius: 8, xOffset: 10, yOffset: 10 }}
                  nextLink={true}
                  className="text-gray-800 underline z-10 dark:text-gray-50 pr-3 font-inter text-lg font-medium">
                  rating format
                </A>
              </Link>
            </p>
            <p className="max-w-xl mx-auto text-base text-gray-500">
              Started properly tracking since 2020, more movies on my{' '}
              <A
                target="_blank"
                dataOptions={{ radius: 4 }}
                href="https://letterboxd.com/CryogenicPlanet/"
                className="text-gray-800 underline z-10 dark:text-gray-50 pr-3 font-inter text-base font-medium">
                letterbox
              </A>
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 space-y-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
            {reviews.map((review, index) => {
              const date = new Date(review.Seen)

              return (
                <li
                  className="col-span-1 bg-white flex flex-col items-center w-full rounded-lg shadow divide-y divide-gray-200"
                  key={index}>
                  <div className="w-full flex flex-col items-center justify-between p-6 space-y-2">
                    <img
                      className="aspect-w-16 max-w-[248px]"
                      src={review.poster}
                      alt=""
                    />
                    <div className="flex-1 w-full">
                      <div className="flex justify-start items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">
                          {review.Name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-start items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">
                          {date.toLocaleString('default', { month: 'long' })}{' '}
                          {date.getFullYear()}
                        </h3>
                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                          {review.Rewatch ? 'Rewatch' : 'First Watch'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="-mt-px p-4 flex divide-x divide-gray-200">
                      {review.Tier !== 'Meta' && (
                        <SmallRatingComponent
                          rating={{ ...review }}></SmallRatingComponent>
                      )}
                    </div>
                  </div>
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
