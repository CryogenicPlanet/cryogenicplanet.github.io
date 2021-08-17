import { NextApiRequest, NextApiResponse } from 'next'

import { getAllPosts } from '@utils/blog'
import { generateRssFeed } from '@utils/rss'

const rssEndPoint = async (_req: NextApiRequest, res: NextApiResponse) => {
  const dynamicPosts = (await getAllPosts()).filter(p => p.published)

  const feed = await generateRssFeed(dynamicPosts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(feed.rss2())
  res.end()
}

export default rssEndPoint
