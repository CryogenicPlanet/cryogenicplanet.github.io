import { promises } from 'fs'
import path from 'path'

import z from 'zod'

import { Movie, movieSchema } from '@interfaces/index'
import { getAllMovies } from '@utils/blog'

import { getPoster } from './getPoster'

export const getReviewsStaticProps = async () => {
  const reviewsPath = path.join(process.cwd(), 'reviews.json')

  try {
    await promises.access(reviewsPath)

    const reviews = z
      .array(movieSchema)
      .parse(await promises.readFile(reviewsPath, 'utf8')) as Movie[]

    return { reviews }
  } catch {
    const { reviews } = await getReviews(true)

    await promises.writeFile(reviewsPath, JSON.stringify(reviews))

    return { reviews }
  }
}

export const getReviews = async (getStaticProps?: boolean) => {
  const movies = await getAllMovies()

  const reviewPromises = movies
    .filter(m => m.Tier !== "Didn't finish - Not necessarily bad")
    .sort((a, b) => {
      return new Date(b.Seen).getTime() - new Date(a.Seen).getTime()
    })
    .map(async m => {
      try {
        if (m.posterOverwrite) return { ...m, poster: m.posterOverwrite }
        const { poster } = await getPoster({
          props: {
            name: m.Name,
            release2022: m['2022 Release'] ? 'true' : 'false'
          },
          getStaticProps
        })

        if (!poster) return m

        return { ...m, poster: poster }
      } catch (err) {
        console.error(err)
        return m
      }
    })

  const reviews = await Promise.all(reviewPromises)

  return { reviews }
}
