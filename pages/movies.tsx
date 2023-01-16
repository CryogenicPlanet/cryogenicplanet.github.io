import Link from 'next/link'
import { Fragment, useState } from 'react'

import { Card } from '@components/Card'
import Layout from '@components/Layout'
import { RewatchTag } from '@components/Movie'
import { SmallRatingComponent } from '@components/Rating'
import { generateStats, StatComponent, Stats } from '@components/Stats'
import { Disclosure, Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Movie } from '@interfaces/index'
import { view } from '@risingstack/react-easy-state'
import { classNames } from '@utils/classNames'

import { getReviewsISR } from '../utils/reviews'

const sortingOptions = [
  {
    label: 'Last Seen',
    sortFunc: (a: Movie, b: Movie) =>
      new Date(b.Seen).getTime() - new Date(a.Seen).getTime()
  },
  {
    label: 'Top Rated (Overall)',
    sortFunc: (a: Movie, b: Movie) => b.score - a.score
  },
  {
    label: 'Top Rated (Enjoyment)',
    sortFunc: (a: Movie, b: Movie) => b.enjoymentScore - a.enjoymentScore
  },
  {
    label: 'Top Rated (Quality)',
    sortFunc: (a: Movie, b: Movie) => b.qualityScore - a.qualityScore
  },
  {
    label: 'Max Disappointment',
    sortFunc: (a: Movie, b: Movie) =>
      b.disappointmentScore - a.disappointmentScore
  }
] as const

export const Movies = view(
  ({
    reviews,
    stats,
    openStats = false
  }: {
    reviews: Movie[]
    stats?: Stats
    openStats?: boolean
  }) => {
    const [sort, setSort] = useState<number>(0)

    const sortedReviews = reviews.sort(sortingOptions[sort]?.sortFunc)

    return (
      <div className="py-10 ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold dark:text-gray-200 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              List of Movies {`I've`} watched
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              This is a list of movie {`I've`} watched rated in my new{' '}
              <Link href="/posts/rating">
                <a
                  href="/posts/rating"
                  className="text-gray-800 underline z-10 dark:text-gray-50 pr-3 font-inter text-lg font-medium">
                  rating format
                </a>
              </Link>
            </p>
            <p className="max-w-xl mx-auto text-base text-gray-500">
              Started properly tracking since 2022, more movies on my{' '}
              <a
                target="_blank"
                href="https://letterboxd.com/CryogenicPlanet/"
                className="text-gray-800 underline z-10 dark:text-gray-50 pr-3 font-inter text-base font-medium"
                rel="noreferrer">
                letterbox
              </a>
            </p>

            <Disclosure defaultOpen={openStats}>
              <Disclosure.Button className="max-w-3xl mt-2 mx-auto text-base text-gray-500 flex sm:flex-row flex-col items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                <p>
                  This year, {`I've`} seen{' '}
                  {
                    reviews.filter(
                      r =>
                        new Date(r.Seen).getFullYear() ===
                        new Date().getFullYear()
                    ).length
                  }{' '}
                  movies.
                </p>
                <span className="flex sm:pl-2 hover:text-gray-300 items-center space-x-2">
                  More stats
                  <ChevronDownIcon className="w-4 h-4"></ChevronDownIcon>
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="text-gray-500 flex flex-col text-left justify-start items-center sm:max-w-5xl w-full mx-0 sm:mx-auto sm:px-20">
                <div className="py-5"></div>
                <div className="bg-slate-50 px-4 sm:px-10 py-4 shadow-xl rounded-2xl">
                  <div className="flex w-full">
                    <p className="text-2xl flex-1 flex justify-start text-gray-900 font-semibold">
                      Movie Stats
                    </p>
                    <div>
                      <Disclosure.Button className="max-w-3xl mt-2 mx-auto text-base text-gray-500 flex space-x-2">
                        <XMarkIcon className="w-6 h-6"></XMarkIcon>
                      </Disclosure.Button>
                    </div>
                  </div>
                  {stats && <StatComponent stats={stats}></StatComponent>}
                </div>
              </Disclosure.Panel>
            </Disclosure>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 space-y-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
          <div className="flex items-center space-x-2 w-full max-w-5xl pt-2">
            <div className="flex-1"></div>
            <div className="dark">
              <Listbox value={sort} onChange={setSort}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium text-gray-300">
                      Sort by
                    </Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full min-w-[200px] cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <span className="block">
                          {sortingOptions[sort]?.label}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full max-w-xs overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {sortingOptions.map((sort, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'text-white bg-indigo-600'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={idx}>
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'block truncate'
                                    )}>
                                    {sort.label}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? 'text-white'
                                          : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}>
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

              {/* <SelectBox handleSelect={value => setSort(value)} value={sort}>
                {sortingOptions.map((option, idx) => (
                  <SelectBoxItem key={idx} value={idx} text={option.label} />
                ))}
              </SelectBox> */}
            </div>
          </div>

          <ul className="grid p-6 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
            {sortedReviews.map(review => {
              const date = new Date(review.Seen)
              return (
                <Card as="li" key={review.id} className="w-full">
                  <div className="flex justify-center max-h-[430px]">
                    <img
                      className="w-full object-contain h-auto"
                      src={review.poster}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 flex flex-col w-full justify-start">
                    <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-teal-500">
                      <Card.Link href={`/movies/${review.Name}/${review.id}`}>
                        {review.Name}
                      </Card.Link>
                    </h2>
                    <Card.Description className="w-full flex-1 flex flex-col">
                      <SmallRatingComponent rating={{ ...review }} />
                    </Card.Description>
                    <div className="relative w-full mt-6 flex items-end text-sm font-medium text-zinc-400 dark:text-zinc-200">
                      <div className="flex w-full max-w-[50%] items-center">
                        <div className="flex space-x-2">
                          <RewatchTag reWatch={review.Rewatch}></RewatchTag>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-end divide-x-2 divide-gray-500 divide-opacity-30 group-hover:text-teal-500">
                        <p className="px-2 capitalize ">
                          {date.toLocaleString('default', {
                            month: 'long'
                          })}{' '}
                          {date.getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
)

export const getStaticProps = async () => {
  const { reviews } = await getReviewsISR()

  return {
    props: {
      reviews: reviews,
      stats: generateStats(reviews)
    },
    revalidate: 1
  }
}

const MoviePage = ({ reviews, stats }: { reviews: Movie[]; stats: Stats }) => {
  return (
    <Layout
      title="Movies | Rahul Tarak"
      description="List of movies I've watched since 2022"
      ogImage="https://user-images.githubusercontent.com/10355479/178099683-6ebf7d20-9e8e-4c9a-b7ba-689ddbc221dd.png">
      <Movies reviews={reviews} stats={stats}></Movies>
    </Layout>
  )
}

export default MoviePage
