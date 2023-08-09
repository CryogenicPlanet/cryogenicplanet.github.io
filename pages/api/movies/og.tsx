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

  const moviePoster =
    searchParams.get('poster') ||
    'https://m.media-amazon.com/images/M/MV5BMjAxOTU3Mzc1M15BMl5BanBnXkFtZTcwMzk1ODUzNg@@._V1_SX300.jpg'
  const enjoymentScore = parseFloat(searchParams.get('enjoyment') || '9')
  const qualityScore = parseFloat(searchParams.get('quality') || '9')

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
        <div tw="h-full w-full bg-zinc-900 flex">
          <img
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0
            }}
            width={1200}
            src={'https://cryogenicplanet.tech/images/movieOg.png'}
            height={630}></img>
          <div tw="flex w-full md:items-center justify-between h-full">
            <div tw="flex w-1/3 flex-col items-center justify-center space-y-4">
              <p tw="text-4xl text-zinc-300">Quality</p>
              <CircularProgress
                percentage={qualityScore * 10}
                color="text-zinc-500"></CircularProgress>
            </div>

            <div tw="h-full flex w-1/3 items-center">
              <img src={moviePoster} alt="" width={430} height={636} />
            </div>

            <div tw="flex flex-col w-1/3 items-center justify-center space-y-4 px-8">
              <p tw="text-4xl text-zinc-300">Enjoyment</p>
              <CircularProgress
                percentage={enjoymentScore * 10}
                color="text-zinc-500"></CircularProgress>
            </div>
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
