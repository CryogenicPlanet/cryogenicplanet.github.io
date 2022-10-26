import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next/types'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { getPoster } from 'pages/api/movies/poster'
import { Movies } from 'pages/movies'
import { Fragment } from 'react'

import Layout from '@components/Layout'
import { PlatformTag, RewatchTag, WhereWatchTag } from '@components/Movie'
import { SmallRatingComponent } from '@components/Rating'
import { NotionRenderer } from '@cryogenicplanet/react-notion-x'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Movie } from '@interfaces/index'
import { getAllMovies } from '@utils/blog'

const notion = new NotionAPI()

export default function MoviePage({
  movie,
  recordMap,
  reviews
}: {
  movie: Movie
  recordMap: ExtendedRecordMap
  reviews: Movie[]
}) {
  const router = useRouter()

  if (!movie) return null

  const date = new Date(movie.Seen)

  return (
    <Layout
      title={`${movie.Name} | Rahul Tarak`}
      description={`Review of ${movie.Name} by Rahul Tarak`}
      ogImage={movie.poster}>
      <div className="grid">
        <div className="stackedLayer">
          <Movies reviews={reviews}></Movies>
        </div>
        <div className="stackedLayer">
          <Transition.Root show={true} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => {
                router.push('/movies')
              }}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="hidden md:inline-block md:align-middle md:h-screen"
                    aria-hidden="true">
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    enterTo="opacity-100 translate-y-0 md:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 md:scale-100"
                    leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                    <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl">
                      <div className="w-full relative flex items-center bg-zinc-800 px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                        <button
                          type="button"
                          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                          onClick={() => {
                            router.push('/movies')
                          }}>
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:items-center lg:gap-x-8">
                          <div className="aspect-w-2 aspect-h-3 rounded-lg bg-transparent overflow-hidden sm:col-span-4 lg:col-span-5">
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
                              <div className="flex justify-start space-x-4 py-2">
                                <div className="flex justify-center items-center space-x-3">
                                  <h3 className="text-gray-900 text-sm font-medium truncate">
                                    <RewatchTag
                                      reWatch={movie.Rewatch}></RewatchTag>
                                  </h3>
                                </div>
                                <div className="flex justify-center items-center space-x-3">
                                  <h3 className="text-gray-400 text-sm font-medium truncate">
                                    Watched on -{' '}
                                    <PlatformTag
                                      platform={
                                        movie['Device/Location']
                                      }></PlatformTag>
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
                            <div className="w-full h-1 bg-slate-700 " />
                            {/* <div className="pb-3" /> */}

                            <section aria-labelledby="options-heading">
                              <div className="w-full h-full max-h-[40vh] overflow-auto">
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
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ params }: GetServerSidePropsContext) => {
  // Get all posts again

  if (!params?.id) {
    return { props: { notFound: true } }
  }

  try {
    const reviews = await Promise.all(
      (
        await getAllMovies()
      )
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
            return m
          }
        })
    )

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
