import React from 'react'

import {
  MovieDevice,
  movieDevice,
  MovieWhereWatch,
  whereWatch
} from '@interfaces/index'

export const RewatchTag = ({ reWatch }: { reWatch: boolean }) => {
  if (reWatch) {
    return (
      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-indigo-800 text-xs font-medium bg-indigo-100 rounded-full">
        Rewatch
      </span>
    )
  } else {
    return (
      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
        First Watch
      </span>
    )
  }
}

export const PlatformTag = ({ platform }: { platform: MovieDevice }) => {
  const device = movieDevice[platform]

  return (
    <span
      className="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium  rounded-full"
      style={{
        backgroundColor: `rgba(${device.rgba})`
      }}>
      {device.name}
    </span>
  )
}

export const WhereWatchTag = ({ platform }: { platform: MovieWhereWatch }) => {
  const hex = whereWatch[platform]

  return (
    <span
      className="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium  rounded-full"
      style={{
        backgroundColor: `rgba(${hex.rgba})`
      }}>
      {platform}
    </span>
  )
}
