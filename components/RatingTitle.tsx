import Link from 'next/link'
import React from 'react'

import { ArrowLeftIcon, CalendarIcon, TagIcon } from '@heroicons/react/solid'
import { Review } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'

import RatingComponent from './Rating'

const ReviewTitle = ({ review }: { review: Review }) => {
  console.log({ review })

  return (
    <div className="w-full mx-auto overflow-hidden ">
      {review.staticImage && (
        <img
          className="object-cover w-full h-64"
          src={`${review.staticImage}`}
          alt="Article"
        />
      )}
      <div className="p-2">
        <div className="mb-12 mt-4 px-3 max-w-7xl">
          <div className="inline-block text-blue-800 bg-blue-100 px-2 py-1 rounded dark:text-yellow-400 dark:bg-gray-700">
            <div className="flex items-center space-x-1">
              <TagIcon className="w-5 h-5" /> <span>{review.tag}</span>
            </div>
          </div>

          <div className="text-3xl font-bold my-3 dark:text-white">
            {review.name}
          </div>

          <div className="text-sm text-gray-400 flex flex-nowrap items-center space-x-2 overflow-hidden">
            <div className="flex items-center space-x-1">
              <Link href="/reviews" passHref>
                <a href="/" className="w-full flex items-center">
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span className="text-lg pl-2">Back</span>
                </a>
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarIcon className="w-5 h-5" />
              <span>{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <span>·</span>
            <span>·</span>
            {review.author.map(author => (
              <div
                key={author.id}
                className="flex items-center space-x-1 flex-shrink-0">
                <img
                  src={author.profilePhoto}
                  alt="profile"
                  className="w-6 h-6 rounded-full"
                />
                <span className="hidden md:block">{author.fullName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {review.tag !== 'Meta' && (
        <div className="pb-6">
          <RatingComponent rating={{ ...review }}></RatingComponent>
        </div>
      )}
    </div>
  )
}

export default view(ReviewTitle)
