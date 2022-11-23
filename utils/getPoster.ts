import { promises } from 'fs'
import path from 'path'

import z from 'zod'

import {
  getPoster as getPosterApi,
  POSTER_API_KEYS,
  posterApiSchema
} from '../pages/api/movies/poster'

const posterSchema = z.record(z.string())

const getPosterGetStaticProps = async (
  props: Parameters<typeof getPosterApi>[0]
) => {
  const { name, release2022 } = props

  const idx = Math.floor(Math.random() * POSTER_API_KEYS.length)

  const key =
    idx < POSTER_API_KEYS.length ? POSTER_API_KEYS[idx]! : POSTER_API_KEYS[0]!

  const data = await fetch(
    `https://omdbapi.com/?apikey=${key}&s=${name}&type=movie&${
      release2022 === 'true' ? 'y=2022' : ''
    }`
  ).then(res => res.json())

  const { Search } = posterApiSchema.parse(data)

  const poster = Search[0]?.Poster

  if (!poster) throw new Error('No poster found')

  return { poster }
}

export const getPoster = async ({
  props,
  getStaticProps
}: {
  props: Parameters<typeof getPosterApi>[0]
  getStaticProps?: boolean
}) => {
  if (getStaticProps) {
    const posterJsonPath = path.join(process.cwd(), 'posters.json')

    try {
      await promises.access(posterJsonPath)

      const posters = posterSchema.parse(
        await promises.readFile(posterJsonPath, 'utf8')
      )
      if (posters[props.name]) return { poster: posters[props.name] }

      const { poster } = await getPosterGetStaticProps(props)
      posters[props.name] = poster

      await promises.writeFile(posterJsonPath, JSON.stringify(posters))
      return { poster }
    } catch (err) {
      const { poster } = await getPosterGetStaticProps(props)

      await promises.writeFile(
        posterJsonPath,
        JSON.stringify({ [props.name]: poster })
      )

      return { poster }
    }
  } else {
    return getPosterApi(props)
  }
}
