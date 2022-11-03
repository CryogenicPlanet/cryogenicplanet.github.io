import { route } from 'next-ts-routes'

import { getAllMovies } from '@utils/blog'

import { getPoster } from './poster'

const { handler, get } = route('api/movies/reviews', {
  async GET(_, { res }) {
    const movies = await getAllMovies()

    const reviewPromises = movies
      .filter(m => m.Tier !== "Didn't finish - Not necessarily bad")
      .sort((a, b) => {
        return new Date(b.Seen).getTime() - new Date(a.Seen).getTime()
      })
      .map(async m => {
        try {
          if (m.posterOverwrite) return { ...m, poster: m.posterOverwrite }
          const poster = await getPoster({
            name: m.Name,
            release2022: m['2022 Release'] ? 'true' : 'false'
          })

          if (!poster) return m

          return { ...m, poster: poster }
        } catch (err) {
          console.error(err)
          return m
        }
      })

    const reviews = await Promise.all(reviewPromises)

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')

    return reviews
  }
})

export const getReviews = get

export default handler
