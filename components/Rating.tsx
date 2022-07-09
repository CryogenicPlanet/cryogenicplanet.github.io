import React from 'react'

import { Rating } from '@interfaces/index'

const RatingComponent = ({ rating }: { rating: Rating }) => {
  const { Enjoyment, Quality, Disappointment } = rating

  const enjoyment = parseInt(Enjoyment)
  const quality = parseInt(Quality)
  const disappointment = parseInt(Disappointment)

  const score = (quality + enjoyment) / (20 + disappointment)

  const disappointmentBg =
    disappointment < 0
      ? 'bg-green-200 dark:bg-green-800 bg-opacity-50 dark:bg-opacity-50'
      : disappointment === 0
      ? 'bg-gray-300 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50'
      : 'bg-gray-200'

  return (
    <div className="flex w-full flex-col space-y-4">
      <div>
        <h4 className="sr-only">Status</h4>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
          Quality ({quality})
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="flex bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
            <div
              className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
              style={{ width: `${(quality / 10) * 100}%` }}
            />
            <div className="h-2  flex-1 bg-gray-200 transition-all duration-200 ease-in-out"></div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="sr-only">Status</h4>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
          Enjoyment ({enjoyment})
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="flex bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
            <div
              className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
              style={{ width: `${(enjoyment / 10) * 100}%` }}
            />
            <div className="h-2  flex-1 bg-gray-200 transition-all duration-200 ease-in-out"></div>
          </div>
        </div>
      </div>
      {disappointment !== 0 && (
        <div>
          <h4 className="sr-only">Status</h4>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
            Disappointment ({disappointment})
          </p>
          <div className="mt-2" aria-hidden="true">
            <div
              className={`flex ${
                disappointment > 0
                  ? 'bg-gradient-to-r from-red-300 via-red-500 to-red-900'
                  : 'bg-transparent'
              } rounded-full overflow-hidden`}>
              <div
                className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
                style={{
                  width: `${(disappointment / 5) * 100}%`
                }}
              />
              <div
                className={`h-2  flex-1 ${disappointmentBg} transition-all duration-300 ease-in-out`}></div>
            </div>
          </div>
        </div>
      )}
      <div>
        <h4 className="sr-only">Status</h4>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
          Total ({`${(score * 100).toFixed(1)}%`})
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="flex bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
            <div
              className="h-2  bg-transparent rounded-full  transition-all duration-200 ease-in-out"
              style={{ width: `${score * 100}%` }}
            />
            <div className="h-2  flex-1 bg-gray-200 transition-all duration-200 ease-in-out"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SmallRatingComponent = ({ rating }: { rating: Rating }) => {
  const { Enjoyment, Quality, Disappointment } = rating

  const enjoyment = parseInt(Enjoyment)
  const quality = parseInt(Quality)
  const disappointment = parseInt(Disappointment)

  const score = (quality + enjoyment) / (20 + disappointment)

  const disappointmentBg =
    disappointment < 0
      ? 'bg-green-200 dark:bg-green-800 bg-opacity-50 dark:bg-opacity-50'
      : disappointment === 0
      ? 'bg-gray-300 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50'
      : 'bg-gray-200'

  if (!enjoyment || !quality)
    return (
      <p className="text-xs text-gray-500">This movie has not been rated</p>
    )

  return (
    <div className="flex w-full flex-col space-y-4">
      <div>
        <h4 className="sr-only">Status</h4>
        <p className="text-xs font-medium text-gray-900">Quality ({quality})</p>
        <div className="mt-1" aria-hidden="true">
          <div className="flex bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
            <div
              className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
              style={{ width: `${(quality / 10) * 100}%` }}
            />
            <div className="h-2  flex-1 bg-gray-200 transition-all duration-200 ease-in-out"></div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="sr-only">Status</h4>
        <p className="text-xs font-medium text-gray-900 ">
          Enjoyment ({enjoyment})
        </p>
        <div className="mt-1" aria-hidden="true">
          <div className="flex bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
            <div
              className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
              style={{ width: `${(enjoyment / 10) * 100}%` }}
            />
            <div className="h-2  flex-1 bg-gray-200 transition-all duration-200 ease-in-out"></div>
          </div>
        </div>
      </div>
      {disappointment !== 0 && (
        <div>
          <h4 className="sr-only">Status</h4>
          <p className="text-xs font-medium text-gray-900">
            Disappointment ({disappointment})
          </p>
          <div className="mt-1" aria-hidden="true">
            <div
              className={`flex ${
                disappointment > 0
                  ? 'bg-gradient-to-r from-red-300 via-red-500 to-red-900'
                  : 'bg-transparent'
              } rounded-full overflow-hidden`}>
              <div
                className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
                style={{
                  width: `${(disappointment / 5) * 100}%`
                }}
              />
              <div
                className={`h-2  flex-1 ${disappointmentBg} transition-all duration-300 ease-in-out`}></div>
            </div>
          </div>
        </div>
      )}
      <p className="text-base font-medium text-gray-900">
        Score <span className="font-semibold">{(score * 100).toFixed(0)}%</span>
      </p>
    </div>
  )
}

export default RatingComponent
