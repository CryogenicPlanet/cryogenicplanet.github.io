// api/clip.ts
import { route, RouteError } from 'next-ts-routes'
import { z } from 'zod'

export const POSTER_API_KEYS = ['71788799', '1d933979', 'bfb4ad6b']

export const posterApiSchema = z.object({
  Search: z.array(
    z.object({
      Title: z.string(),
      Year: z.string(),
      imdbID: z.string(),
      Type: z.string(),
      Poster: z.string()
    })
  ),
  totalResults: z.string(),
  Response: z.string()
})

const { handler, get } = route('api/movies/poster', {
  GET: async (
    { input }: { input: { name: string; release2022: 'true' | 'false' } },
    { res }
  ) => {
    try {
      const { name, release2022 } = input

      const idx = Math.floor(Math.random() * POSTER_API_KEYS.length)

      const key =
        idx < POSTER_API_KEYS.length
          ? POSTER_API_KEYS[idx]!
          : POSTER_API_KEYS[0]!

      const data = await fetch(
        `https://omdbapi.com/?apikey=${key}&s=${name}&type=movie&${
          release2022 === 'true' ? 'y=2022' : ''
        }`
      ).then(res => res.json())

      const { Search } = posterApiSchema.parse(data)

      const poster = Search[0]?.Poster

      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')

      if (!poster) throw new Error('No poster found')

      return { poster }
    } catch (err) {
      throw new RouteError(`Error: ${JSON.stringify(err)}`, 500)
    }
  }
})

export const getPoster = get

export default handler
