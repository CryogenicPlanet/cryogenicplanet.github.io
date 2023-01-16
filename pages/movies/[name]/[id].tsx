import { GetStaticProps } from 'next/types'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'

import Layout from '@components/Layout'
import { PlatformTag, RewatchTag, WhereWatchTag } from '@components/Movie'
import { SmallRatingComponent } from '@components/Rating'
import { NotionRenderer } from '@cryogenicplanet/react-notion-x'
import { Movie } from '@interfaces/index'
import { getAllMovies } from '@utils/blog'
import { getReviewsISR } from '@utils/reviews'

const notion = new NotionAPI()

export default function MoviePage({
  movie,
  recordMap
}: {
  movie: Movie
  recordMap: ExtendedRecordMap
}) {
  if (!movie) return null

  const date = new Date(movie.Seen)

  return (
    <Layout
      title={`${movie.Name} | Rahul Tarak`}
      description={`Review of ${movie.Name} by Rahul Tarak`}
      ogImage={movie.poster}>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-6xl">
          <div className="my-16">
            <div className="py-2 sm:p-8 flex flex-col items-center justify-center  rounded ">
              <div className="w-full relative flex items-center overflow-hidden  ">
                <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:items-center lg:gap-x-8">
                  <div className="aspect-w-2 aspect-h-3  rounded-lg bg-transparent overflow-hidden sm:col-span-4 lg:col-span-5">
                    <img
                      src={movie.poster}
                      alt={movie.Name}
                      className="object-center object-cover"
                    />
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-xl font-medium text-gray-300 capitalize sm:pr-12">
                      {movie.Name}
                    </h2>
                    <div className="flex-1 w-full">
                      <div className="flex justify-start items-center space-x-3">
                        <h3 className="text-gray-400 text-sm font-medium truncate">
                          Seen{' '}
                          {date.toLocaleString('default', {
                            month: 'long'
                          })}{' '}
                          {date.getFullYear()}
                        </h3>
                      </div>
                    </div>

                    <section
                      aria-labelledby="information-heading"
                      className="mt-1 flex flex-col space-y-4">
                      <div className="flex justify-between sm:justify-start space-x-4 py-2">
                        <div className="flex justify-center items-center space-x-3">
                          <h3 className="text-gray-900 text-sm font-medium truncate">
                            <RewatchTag reWatch={movie.Rewatch}></RewatchTag>
                          </h3>
                        </div>
                        <div className="flex justify-center items-center space-x-3">
                          <h3 className="text-gray-400 text-sm font-medium truncate">
                            <PlatformTag
                              platform={movie['Device/Location']}></PlatformTag>
                          </h3>
                        </div>

                        <div className="flex justify-center items-center space-x-3">
                          <h3 className="text-gray-400 text-sm font-medium  flex space-x-2 overflow-auto">
                            {movie['Where did you watch'].map(
                              (where, index) => {
                                return (
                                  <WhereWatchTag
                                    key={index}
                                    platform={where}></WhereWatchTag>
                                )
                              }
                            )}
                          </h3>
                        </div>
                      </div>

                      {/* Reviews */}
                      <div className="mt-4">
                        <h4 className="sr-only">Reviews</h4>
                        <div className="flex items-center">
                          <SmallRatingComponent rating={{ ...movie }} />
                        </div>
                      </div>
                    </section>

                    <div className="pt-3" />
                    <div className="w-full h-[1px] bg-slate-700/40 " />

                    <section aria-labelledby="options-heading">
                      <div className="w-full h-full sm:max-h-[60vh] overflow-auto">
                        <NotionRenderer
                          recordMap={recordMap}
                          darkMode={true}
                          fullPage={false}
                        />
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  // Get all posts again

  const { params } = ctx

  if (!params?.id) {
    return { props: { notFound: true } }
  }

  try {
    const { reviews } = await getReviewsISR()

    if (!reviews) return { props: { notFound: true } }

    const movie = reviews.filter(
      m => m.id === params?.id || m.id.replace('-', '') === params?.id
    )[0]

    if (!movie) {
      return { props: { notFound: true } }
    }

    const [recordMap] = await Promise.all([notion.getPage(movie.id)])

    return {
      props: {
        movie: movie,
        recordMap: recordMap,
        reviews: reviews
      },
      revalidate: 10
    }
  } catch (err) {
    console.error('No image page for ', params.name)
    return { props: { notFound: true } }
  }
}

export const getStaticPaths = async () => {
  // Get all posts again

  const movies = await getAllMovies()

  return {
    paths: movies.map(movie => `/movies/${movie.Name}/${movie.id}`),
    fallback: true
  }
}
