/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unknown-property */

import { NextRequest } from 'next/server'

import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge'
}

function CircularProgress({
  percentage,
  color
}: {
  percentage: number
  color: string
}) {
  const progress = percentage / 100
  const dasharray = Math.PI * 2 * 45

  return (
    <div tw="flex justify-center items-center relative">
      <svg
        viewBox="0 0 100 100"
        // @ts-expect-error
        tw={color}>
        <path
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${dasharray}`}
          strokeDashoffset={`${dasharray * (1 - progress)}`}
        />
      </svg>
      <div tw="absolute flex text-gray-50 text-lg font-bold">{percentage}%</div>
    </div>
  )
}

export default async function (request: NextRequest) {
  const { searchParams } = request.nextUrl

  const movieName = searchParams.get('name') || 'Moneyball'
  const moviePoster =
    searchParams.get('poster') ||
    'https://m.media-amazon.com/images/M/MV5BMjAxOTU3Mzc1M15BMl5BanBnXkFtZTcwMzk1ODUzNg@@._V1_SX300.jpg'
  const enjoymentScore = parseFloat(searchParams.get('enjoyment') || '0')
  const qualityScore = parseFloat(searchParams.get('quality') || '0')
  const date = searchParams.get('date') || '22nd May 2023'

  // const username = searchParams.get('username')

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <div
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(251, 146, 60), rgb(251, 113, 133))'
          }}
          tw="h-full w-full bg-zinc-900 flex">
          <div tw="flex flex-col md:flex-row w-full md:items-center justify-between h-full">
            <div tw="h-full flex items-center">
              <img src={moviePoster} alt="" width={430} height={636} />
            </div>
            <div
              tw="flex-1 flex flex-col px-8 w-full justify-center"
              style={{}}>
              <p tw="text-8xl text-gray-50 leading-8 capitalize">{movieName}</p>
              <p tw="text-2xl text-gray-50 leading-8 capitalize">{date}</p>

              <div tw="flex py-4 items-center w-full">
                <div tw="flex flex-col space-y-4">
                  <p tw="text-4xl text-gray-50">Quality</p>
                  <CircularProgress
                    percentage={qualityScore * 10}
                    color="text-indigo-500"></CircularProgress>
                </div>
                <div tw="flex flex-col space-y-4 px-8">
                  <p tw="text-4xl text-gray-50">Enjoyment</p>
                  <CircularProgress
                    percentage={enjoymentScore * 10}
                    color="text-indigo-500"></CircularProgress>
                </div>

                {/* <div
                  tw="h-2 flex  bg-transparent rounded-full transition-all duration-200 ease-in-out"
                  style={{ width: `${(8 / 10) * 100}%` }}
                />
                <div tw="h-2  flex-1 bg-zinc-700 transition-all duration-200 ease-in-out"></div> */}
              </div>
            </div>
            {/* <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <div tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                  Get started
                </div>
              </div>
              <div tw="ml-3 flex rounded-md shadow">
                <div
                  // href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                  Learn more
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
