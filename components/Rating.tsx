import clsx from 'clsx'

import { Rating, RawRating } from '@interfaces/index'

const getDisappointmentBg = (disappointmentScore: number) =>
  disappointmentScore < 0
    ? 'bg-green-500'
    : disappointmentScore === 0
    ? 'bg-zinc-300'
    : 'bg-zinc-700'

const RatingComponent = ({ rating }: { rating: Rating }) => {
  const { enjoymentScore, qualityScore, disappointmentScore, score } = rating

  const disappointmentBg = getDisappointmentBg(disappointmentScore)

  return (
    <div className="flex w-full flex-col space-y-4">
      <div>
        <h4 className="sr-only">Status</h4>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
          Quality ({qualityScore})
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="flex bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
            <div
              className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
              style={{ width: `${(qualityScore / 10) * 100}%` }}
            />
            <div className="h-2  flex-1 bg-gray-200 transition-all duration-200 ease-in-out"></div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="sr-only">Status</h4>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
          Enjoyment ({enjoymentScore})
        </p>
        <div className="mt-2" aria-hidden="true">
          <div className="flex bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
            <div
              className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
              style={{ width: `${(enjoymentScore / 10) * 100}%` }}
            />
            <div className="h-2  flex-1 bg-gray-200 transition-all duration-200 ease-in-out"></div>
          </div>
        </div>
      </div>
      {disappointmentScore !== 0 && (
        <div>
          <h4 className="sr-only">Status</h4>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
            Disappointment ({disappointmentScore})
          </p>
          <div className="mt-2" aria-hidden="true">
            <div
              className={`flex ${
                disappointmentScore > 0
                  ? 'bg-gradient-to-r from-red-300 via-red-500 to-red-900'
                  : 'bg-transparent'
              } rounded-full overflow-hidden`}>
              <div
                className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
                style={{
                  width: `${(disappointmentScore / 5) * 100}%`
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

export const computeScore = (rating: RawRating) => {
  const { Enjoyment, Quality, Disappointment } = rating

  const enjoymentScore = parseInt(Enjoyment)
  const qualityScore = parseInt(Quality)
  const disappointmentScore = parseInt(Disappointment)

  return (qualityScore + enjoymentScore) / (20 + disappointmentScore)
}

export const SmallRatingComponent = ({ rating }: { rating: Rating }) => {
  const { enjoymentScore, qualityScore, disappointmentScore, score } = rating

  const disappointmentBg = getDisappointmentBg(disappointmentScore)

  if (!enjoymentScore || !qualityScore)
    return (
      <p className="text-xs text-gray-400">This movie has not been rated</p>
    )

  return (
    <div className="flex w-full flex-col justify-end space-y-4  flex-1">
      <div className="flex w-full flex-col space-y-4  flex-1">
        <div>
          <h4 className="sr-only">Status</h4>
          <p className="text-xs font-medium text-gray-300 group-hover:text-teal-500">
            Quality ({qualityScore})
          </p>
          <div className="mt-1" aria-hidden="true">
            <div className="flex  bg-gradient-to-r from-green-200 to-green-500 rounded-full overflow-hidden">
              <div
                className="h-2 bg-transparent rounded-full transition-all duration-200 ease-in-out"
                style={{ width: `${(qualityScore / 10) * 100}%` }}
              />
              <div className="h-2 flex-1 bg-zinc-700 transition-all duration-200 ease-in-out"></div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="sr-only">Status</h4>
          <p className="text-xs font-medium text-gray-300 group-hover:text-teal-500">
            Enjoyment ({enjoymentScore})
          </p>
          <div className="mt-1" aria-hidden="true">
            <div className="flex bg-gradient-to-r from-green-200 to-green-500 rounded-full overflow-hidden">
              <div
                className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
                style={{ width: `${(enjoymentScore / 10) * 100}%` }}
              />
              <div className="h-2  flex-1 bg-zinc-700 transition-all duration-200 ease-in-out"></div>
            </div>
          </div>
        </div>
        {disappointmentScore !== 0 && (
          <div>
            <h4 className="sr-only">Status</h4>
            <p className="text-xs font-medium text-gray-300">
              Disappointment ({disappointmentScore})
            </p>
            <div className="mt-1" aria-hidden="true">
              <div
                className={`flex ${
                  disappointmentScore > 0
                    ? 'bg-gradient-to-r from-red-500 to-red-800'
                    : 'bg-transparent'
                } rounded-full overflow-hidden`}>
                <div
                  className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
                  style={{
                    width: `${(disappointmentScore / 5) * 100}%`
                  }}
                />
                <div
                  className={`h-2  flex-1 ${disappointmentBg} transition-all duration-300 ease-in-out`}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <p
        className={clsx(
          disappointmentScore !== 0 ? 'text-base' : 'text-xl',
          ' font-medium text-gray-300 group-hover:text-teal-500 justify-self-end'
        )}>
        Score <span className="font-semibold">{(score * 100).toFixed(0)}%</span>
      </p>
    </div>
  )
}

export const TinyRatingComponent = ({ rating }: { rating: Rating }) => {
  const { enjoymentScore, qualityScore, disappointmentScore } = rating

  const disappointmentBg = getDisappointmentBg(disappointmentScore)

  if (!enjoymentScore || !qualityScore)
    return (
      <p className="text-xs text-gray-500">This movie has not been rated</p>
    )

  return (
    <div className="flex row w-full justify-start space-x-4">
      <div className={disappointmentScore ? 'w-1/3' : 'w-1/2'}>
        <p className="text-xs font-medium text-gray-200">
          Quality ({qualityScore})
        </p>
        <div className="flex  bg-gradient-to-r from-green-200 to-green-500 rounded-full overflow-hidden">
          <div
            className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
            style={{ width: `${(qualityScore / 10) * 100}%` }}
          />
          <div className="h-2  flex-1 bg-zinc-700 transition-all duration-200 ease-in-out"></div>
        </div>
      </div>
      <div className={disappointmentScore ? 'w-1/3' : 'w-1/2'}>
        <p className="text-xs font-medium text-gray-200 ">
          Enjoyment ({enjoymentScore})
        </p>

        <div className="flex  bg-gradient-to-r from-green-200 to-green-500 rounded-full overflow-hidden">
          <div
            className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
            style={{ width: `${(enjoymentScore / 10) * 100}%` }}
          />
          <div className="h-2  flex-1 bg-zinc-700 transition-all duration-200 ease-in-out"></div>
        </div>
      </div>
      {disappointmentScore !== 0 && (
        <div className="flex-1 w-full">
          <p className="text-xs font-medium text-gray-200">
            Disappointment ({disappointmentScore})
          </p>
          <div className="mt-1" aria-hidden="true">
            <div
              className={`flex ${
                disappointmentScore > 0
                  ? 'bg-gradient-to-r from-red-500 to-red-800'
                  : 'bg-transparent'
              } rounded-full overflow-hidden`}>
              <div
                className="h-2  bg-transparent rounded-full transition-all duration-200 ease-in-out"
                style={{
                  width: `${(disappointmentScore / 5) * 100}%`
                }}
              />
              <div
                className={`h-2  flex-1 ${disappointmentBg} transition-all duration-300 ease-in-out`}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RatingComponent
