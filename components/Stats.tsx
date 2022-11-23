import { Movie } from '@interfaces/index'
import { BarChart, BarList, Block } from '@tremor/react'
import { Review } from '@utils/blog'

export type Stats = {
  devices: BarListData[]
  types: BarListData[]
  where: BarListData[]
  moviesByMonth: BarListData[]
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

export const generateStats = (reviews: Movie[]): Stats => {
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
  const twentyTwentyTwo = reviews.filter(
    review => review['2022 Release'] === true
  )

  const types = [
    { name: 'Total movies', value: reviews.length },
    { name: 'First Watch', value: firstWatch.length },
    { name: 'Rewatch', value: reWatch.length },
    { name: '2022 Release', value: twentyTwentyTwo.length },
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
  stateless = false
}: {
  stats: Stats
  stateless?: boolean
}) => {
  const { devices, types, where, moviesByMonth } = stats
  return (
    <div className="grid md:grid-cols-3 gap-x-8 gap-y-2">
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
