import { Movies } from 'pages/movies'

import Layout from '@components/Layout'
import { Stats } from '@components/Stats'
import { RawMovie } from '@interfaces/index'

const MoviePage = ({ reviews, stats }: { reviews: RawMovie[]; stats: Stats }) => {
  return (
    <Layout
      title="Movies | Rahul Tarak"
      description="List of movies I've watched since 2022"
      ogImage="https://user-images.githubusercontent.com/10355479/178099683-6ebf7d20-9e8e-4c9a-b7ba-689ddbc221dd.png">
      <Movies reviews={reviews} stats={stats} openStats={true}></Movies>
    </Layout>
  )
}

export default MoviePage

export { getStaticProps } from 'pages/movies'
