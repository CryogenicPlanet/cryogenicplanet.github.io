import * as fs from 'fs'
import path from 'path'

import { getPlaiceholder } from 'plaiceholder'

const statPromise = (src: string) => {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(src, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

export type ExtractPromise<T> = T extends Promise<infer U> ? U : T

export type Photos = ExtractPromise<ReturnType<typeof getAllImages>>

export const getAllImages = async () => {
  const dirRelativeToPublicFolder = 'images/mozJpeg'

  const dir = path.resolve('./public', dirRelativeToPublicFolder)

  const filenames = fs.readdirSync(dir)

  const images = filenames.map(name =>
    path.join('/', dirRelativeToPublicFolder, name)
  )

  const stats = await Promise.all<fs.Stats>(
    filenames.map(image => statPromise(path.join(dir, image)))
  )

  const imageData = await Promise.all(
    images.map(image => getPlaiceholder(image))
  )

  const imageDataWithStats = imageData.map((image, index) => {
    return { image: { ...image, name: filenames[index]! }, stats: stats[index] }
  })

  imageDataWithStats.sort(
    (a, b) => b.stats!.ctime.getTime() - a.stats!.ctime.getTime()
  )

  return imageDataWithStats.map(image => image.image)
}
