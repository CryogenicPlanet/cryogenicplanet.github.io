import { promises } from 'fs'
import path from 'path'

import { addPosterToPage } from 'lib/notion'
import z from 'zod'

import { computeScore } from '@components/Rating'
import { movieSchema, RawMovie } from '@interfaces/index'
import { getAllMovies } from '@utils/blog'

import { getPoster } from './getPoster'

export const getReviewsStaticProps = async () => {
  const reviewsPath = path.join(process.cwd(), 'reviews.json')

  try {
    await promises.access(reviewsPath)

    const reviews = z
      .array(movieSchema)
      .parse(await promises.readFile(reviewsPath, 'utf8')) as RawMovie[]

    return { reviews }
  } catch {
    const { reviews } = await getReviews(true)

    await promises.writeFile(reviewsPath, JSON.stringify(reviews))

    return { reviews }
  }
}

export const getReviewsISR = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/health`)
    return getReviews(false)
  } catch {
    return getReviewsStaticProps()
  }
}

export const getReviews = async (getStaticProps?: boolean) => {
  const movies = await getAllMovies()

  const reviewPromises = movies
    .filter(m => m.Tier !== "Didn't finish - Not necessarily bad")
    .sort((a, b) => {
      return new Date(b.Seen).getTime() - new Date(a.Seen).getTime()
    })
    .map(m => ({
      ...m,
      score: computeScore(m),
      disappointmentScore: m.Disappointment ? parseInt(m.Disappointment) : 0,
      qualityScore: parseInt(m.Quality),
      enjoymentScore: parseInt(m.Enjoyment)
    }))
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

        addPosterToPage(m.id, poster)

        return { ...m, poster: poster }
      } catch (err) {
        console.error(err)
        return m
      }
    })

  const reviews = await Promise.all(reviewPromises)

  return { reviews }
}
