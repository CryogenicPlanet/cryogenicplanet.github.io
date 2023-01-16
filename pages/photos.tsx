import { GetStaticProps } from 'next'
import Img from 'next/image'
import Link from 'next/link'

import Layout from '@components/Layout'
import { SimpleLayout } from '@components/SimpleLayout'
import { getAllImages, Photos } from '@utils/photos'

export default function PhotosPage({ images }: { images: Photos }) {
  return (
    <Layout title="Photos | Rahul Tarak">
      <SimpleLayout
        title="Photos I've taken over the years"
        intro="I love taking photos mostly of things and places, but sometimes people and nowadays my dog. Almost all of my photos are taken on my Lumix G7">
        <main className="flex-1 overflow-y-auto max-w-5xl">
          <div className="w-full mx-auto">
            {/* Gallery */}
            <section className="" aria-labelledby="gallery-heading flex">
              <ul className="grid grid-cols-2 sm:grid-cols-3">
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
      </SimpleLayout>
    </Layout>
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
