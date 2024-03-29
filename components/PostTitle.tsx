import Link from 'next/link'
import React from 'react'

import { ArrowLeftIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/solid'
import { Post } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { state } from '@utils/store'

const PostTitle = ({ post }: { post: Post }) => {
  return (
    <div className="w-full mx-auto overflow-hidden ">
      {post.ogImage ? (
        <img
          className="object-cover w-full h-64"
          src={`${post.ogImage}&theme=${state.dark ? 'Dark' : 'Light'}`}
          alt="Dynamic"
        />
      ) : post.staticImage ? (
        <img
          className="object-cover w-full h-64"
          src={`${post.staticImage}`}
          alt="Static"
        />
      ) : null}
      <div className="p-2">
        <div className="mb-12 mt-4 px-3 max-w-7xl">
          <div className="inline-block text-blue-800 bg-blue-100 px-2 py-1 rounded dark:text-yellow-400 dark:bg-gray-700">
            <div className="flex items-center space-x-1">
              <TagIcon className="w-5 h-5" /> <span>{post.tag}</span>
            </div>
          </div>

          <div className="text-3xl font-bold my-3 dark:text-white">
            {post.name}
          </div>

          <div className="text-sm text-gray-400 flex flex-nowrap items-center space-x-2 overflow-hidden">
            <div className="flex items-center space-x-1">
              <Link href="/posts" className="w-full flex items-center">
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="text-lg pl-2">Back</span>
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarIcon className="w-5 h-5" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <span>·</span>
            <span>·</span>
            {post.author.map(author => (
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
    </div>
  )
}

export default view(PostTitle)
