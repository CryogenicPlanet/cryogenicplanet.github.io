import Link from 'next/link'
import React from 'react'

import A from '@components/Blobity'
import Layout from '@components/Layout'
import { SmallRatingComponent } from '@components/Rating'
import { Review } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { getAllReviews } from '@utils/blog'
import { getSlug } from '@utils/review'

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <Layout title="Reviews | Rahul Tarak">
      <div className="py-10 ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold dark:text-gray-200 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              List of Movie/Tv Reviews
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              This is a list of movie reviews in my new{' '}
              <Link href="/reviews/rating">
                <A
                  dataOptions={{ radius: 8, xOffset: 10, yOffset: 10 }}
                  nextLink={true}
                  className="text-gray-800 underline z-10 dark:text-gray-50 pr-3 font-inter text-lg font-medium">
                  rating format
                </A>
              </Link>
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 space-y-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => {
              const slug = `/reviews/${getSlug(review)}`

              return (
                <li
                  className="col-span-1 bg-white flex items-center w-full rounded-lg shadow divide-y divide-gray-200"
                  key={index}>
                  <Link href={slug} passHref>
                    <A
                      dataOptions={{ radius: 8, xOffset: 10, yOffset: 10 }}
                      nextLink={true}
                      className=""
                      href={slug}>
                      <div className="w-full flex flex-col items-center justify-between p-6 space-y-2">
                        <div className="p-1">
                          <img
                            className="aspect-w-16"
                            src={review.staticImage}
                            alt=""
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex justify-start items-center space-x-3">
                            <h3 className="text-gray-900 text-sm font-medium truncate">
                              {review.name}
                            </h3>
                            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                              {review.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="-mt-px p-4 flex divide-x divide-gray-200">
                          {review.tag !== 'Meta' && (
                            <SmallRatingComponent
                              rating={{ ...review }}></SmallRatingComponent>
                          )}
                        </div>
                      </div>
                    </A>
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
    const reviews = (await getAllReviews())
      .filter(r => r.published)
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

    return {
      props: {
        reviews
      },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
  }
}

export default view(Reviews)
