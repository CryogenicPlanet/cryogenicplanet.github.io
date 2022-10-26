// api/clip.ts
import { route } from 'next-ts-routes'
import { z } from 'zod'

const API_KEYS = ['71788799', '1d933979']

export const schema = z.object({
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
    const { name, release2022 } = input

    console.log('Get poster of name', name)

    const data = await fetch(
      `https://omdbapi.com/?apikey=${API_KEYS[0]}&s=${name}&type=movie&${
        release2022 === 'true' ? 'y=2022' : ''
      }`
    ).then(res => res.json())

    const { Search } = schema.parse(data)

    const poster = Search[0]?.Poster

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')

    return poster
  }
})

export const getPoster = get

export default handler
