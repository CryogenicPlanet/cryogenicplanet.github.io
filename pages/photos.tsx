import { GetStaticProps } from 'next'
import Img from 'next/future/image'
import Link from 'next/link'
import React from 'react'

import { getAllImages, Photos } from '@utils/photos'

export default function PhotosPage({ images }: { images: Photos }) {
  return (
    <div className="grid min-h-screen h-full bg-gray-900">
      <div className="h-full w-full flex min-h-screen stackedLayer">
        <main className="flex-1 overflow-y-auto">
          <div className="w-full mx-auto">
            {/* Gallery */}
            <section className="" aria-labelledby="gallery-heading flex">
              <ul className="grid grid-cols-2 sm:grid-cols-4">
                {images.map((image, index) => (
                  <li key={index} className="relative">
                    <Link href={`/photos/[name]`} as={`/photos/${image.name}`}>
                      <div
                        style={{
                          backgroundImage: `url(${image.base64})`
                        }}
                        className="flex items-center bg-cover	 h-full w-full  cursor-pointer">
                        <div
                          className={
                            'group block w-full  object-cover object-center overflow-hidden'
                          }>
                          <Img
                            placeholder="blur"
                            {...image.img}
                            blurDataURL={image.base64}
                            quality={40}
                            className={`object-cover`}
                          />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="h-64"></div>
            </section>
          </div>
        </main>
      </div>
      <div className="w-full stackedLayer flex items-end pointer-events-none">
        <div className="sticky bottom-0 left-0 w-full items-center justify-end bg-gray-800 py-10 flex px-20 rounded-t-lg pointer-events-auto">
          <div className="flex-1">
            <div>
              <a
                target="_blank"
                href="https://www.instagram.com/cryogenicplanet/"
                rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 24 30"
                  className="h-8 w-8 text-gray-200 text-opacity-60"
                  x="0px"
                  fill="currentColor"
                  y="0px">
                  <title>Instagram</title>
                  <path d="M20.44,0H3.56A3.57,3.57,0,0,0,0,3.56V20.44A3.57,3.57,0,0,0,3.56,24H20.44A3.57,3.57,0,0,0,24,20.44V3.56A3.57,3.57,0,0,0,20.44,0ZM22,20.44A1.56,1.56,0,0,1,20.44,22H3.56A1.56,1.56,0,0,1,2,20.44V3.56A1.56,1.56,0,0,1,3.56,2H20.44A1.56,1.56,0,0,1,22,3.56Z" />
                  <path d="M12,6a6,6,0,1,0,6,6A6,6,0,0,0,12,6Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z" />
                  <circle cx="18.5" cy="5.5" r="1.5" />
                </svg>
              </a>
            </div>
          </div>
          <div className="">
            <p className="text-gray-200 text-2xl font-medium text-opacity-50 capitalize">
              by CryogenicPlanet
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Get all posts again

  try {
    const images = await getAllImages()

    return {
      props: {
        images
      }
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true
    }
  }
}
