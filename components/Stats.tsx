import { useState } from 'react'

import { RawMovie, ReleaseYear, UsableReleaseYear } from '@interfaces/index'
import { BarChart, BarList, Block, Tab, TabList } from '@tremor/react'
import { Review } from '@utils/blog'

export type SingleYearStats = {
  devices: BarListData[]
  types: BarListData[]
  where: BarListData[]
  moviesByMonth: BarListData[]
}

export type Stats = { all: SingleYearStats } & {
  [_ in Exclude<ReleaseYear, 'Pre 2022'>]: SingleYearStats
}

type BarListData = {
  name: string
  value: number
}

const valueFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString()

const dataFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString()
}

export const generateStats = (reviews: RawMovie[]): Stats => {
  const all = generateStatsForOneYear(reviews, 'all')

  const twentyTwentyTwo = generateStatsForOneYear(
    reviews.filter(r => new Date(r.Seen).getFullYear() === 2022),
    '2022'
  )
  const twentyTwentyThree = generateStatsForOneYear(
    reviews.filter(r => new Date(r.Seen).getFullYear() === 2023),
    '2023'
  )

  return {
    all,
    '2022': twentyTwentyTwo,
    '2023': twentyTwentyThree
  }
}

export const generateStatsForOneYear = (
  reviews: RawMovie[],
  year: Exclude<ReleaseYear, 'Pre 2022'> | 'all'
): SingleYearStats => {
  const deviceObj: Record<Review['Device/Location'], BarListData> = {
    '💺Imax': { name: '💺Imax', value: 0 },
    '🛋️ Private theatre': { name: '🛋️ Private theatre', value: 0 },
    '🪑Theatre': { name: '🪑Theatre', value: 0 },
    '💻 Laptop': { name: '💻 Laptop', value: 0 },
    '📱IPad': { name: '📱IPad', value: 0 },
    '📺 UW': { name: '📺 UW', value: 0 }
  }
  for (const review of reviews) {
    const device = review['Device/Location']
    if (deviceObj[device]) {
      deviceObj[device].value += 1
    }
  }

  const devices = Object.values(deviceObj).sort((a, b) => b.value - a.value)

  const uniqueMovies = Array.from(
    new Set(reviews.map(review => review.Name.toUpperCase()))
  )
  const firstWatch = reviews.filter(review => review.Rewatch !== true)
  const reWatch = reviews.filter(review => review.Rewatch === true)
  const releasedThisYear = reviews.filter(
    r =>
      r['Release Year'] ===
      (year === 'all' ? `${new Date().getFullYear()}` : year)
  )

  const types = [
    { name: 'Total movies', value: reviews.length },
    { name: 'First Watch', value: firstWatch.length },
    { name: 'Rewatch', value: reWatch.length },
    {
      name: `Released in ${year === 'all' ? new Date().getFullYear() : year}`,
      value: releasedThisYear.length
    },
    { name: 'Unique Movies', value: uniqueMovies.length }
  ].sort((a, b) => b.value - a.value)

  const platforms = {
    'Prime Video': { name: 'Prime Video', value: 0 },
    '🏴‍☠️ Piracy': { name: '🏴‍☠️ Piracy', value: 0 },
    Hotstar: { name: 'Hotstar', value: 0 },
    Netflix: { name: 'Netflix', value: 0 }
  }

  for (const review of reviews) {
    const platformNames = review['Where did you watch']

    if (Array.isArray(platformNames)) {
      for (const platformName of platformNames) {
        // @ts-expect-error
        if (platformName in platforms && platforms[platformName]) {
          // @ts-expect-error
          platforms[platformName]!.value += 1
        }
      }
    } else if (typeof platformNames === 'string') {
      if (platformNames in platforms && platforms[platformNames]) {
        // @ts-expect-error
        platforms[platformNames]!.value += 1
      }
    }
  }

  const where = Object.values(platforms).sort((a, b) => b.value - a.value)

  const months = [
    { name: 'January', value: 0 },
    { name: 'February', value: 0 },
    { name: 'March', value: 0 },
    { name: 'April', value: 0 },
    { name: 'May', value: 0 },
    { name: 'June', value: 0 },
    { name: 'July', value: 0 },
    { name: 'August', value: 0 },
    { name: 'September', value: 0 },
    { name: 'October', value: 0 },
    { name: 'November', value: 0 },
    { name: 'December', value: 0 }
  ]

  for (const review of reviews) {
    const seen = review.Seen
    const date = new Date(seen)
    const month = date.getMonth()

    if (months[month]) {
      months[month]!.value += 1
    }
  }

  const moviesByMonth = months.filter(month => month.value > 0)

  return {
    devices,
    types,
    where,
    moviesByMonth
  }
}

export const StatComponent = ({
  stats,
  stateless
}: {
  stats: Stats
  stateless?: boolean
}) => {
  const [year, setYear] = useState<UsableReleaseYear | 'all'>('all')

  return (
    <div className="flex flex-col w-full">
      <TabList
        defaultValue={'all'}
        handleSelect={value => setYear(value)}
        marginTop="mt-6">
        <Tab value={'all'} text="All years" />
        <Tab value={'2023'} text="2023" />
        <Tab value={'2022'} text="2022" />
      </TabList>

      <SingleYearStatComponent stateless={stateless} stats={stats[year]} />
    </div>
  )
}

const SingleYearStatComponent = ({
  stats,
  stateless = false
}: {
  stats: SingleYearStats
  stateless?: boolean
}) => {
  const { devices, types, where, moviesByMonth } = stats
  return (
    <div className="sm:grid flex flex-col md:grid-cols-3 gap-x-8 gap-y-2">
      <Block>
        <p className="mt-8 text-base text-gray-700 font-bold">
          Device or Location (#)
        </p>
        <BarList
          marginTop="mt-4"
          data={devices}
          showAnimation={!stateless}
          valueFormatter={valueFormatter}
        />
      </Block>
      <Block>
        <p className="mt-8 text-base text-gray-700 font-bold">
          Types of movies (#)
        </p>
        <BarList
          marginTop="mt-4"
          data={types}
          showAnimation={!stateless}
          valueFormatter={valueFormatter}
        />
      </Block>
      <Block>
        <p className="mt-8 text-base text-gray-700 font-bold">Platform (#)</p>
        <BarList
          marginTop="mt-4"
          data={where}
          showAnimation={!stateless}
          valueFormatter={valueFormatter}
        />
      </Block>
      <div className="flex flex-col col-span-3">
        <p className="mt-8 text-base text-gray-700 font-bold">
          Movies per month (#)
        </p>
        <BarChart
          data={moviesByMonth}
          dataKey="name"
          categories={['value']}
          colors={['violet']}
          showLegend={false}
          showAnimation={!stateless}
          valueFormatter={dataFormatter}
          marginTop="mt-6"
          yAxisWidth="w-12"
        />
      </div>
    </div>
  )
}
