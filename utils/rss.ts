import { Feed } from 'feed'

import { Post } from '@interfaces/index'

export const generateRssFeed = (posts: Post[]) => {
  const siteURL = process.env.SITE_URL || 'https://cryogenicplanet.tech'
  const date = new Date()
  const author = {
    name: 'Rahul Tarak',
    email: 'hey@cryogenicplanet.tech',
    link: 'https://twitter.com/cryogenicplanet'
  }

  const feed = new Feed({
    title: "Rahul Tarak's Blog",
    description: 'A blog about startups, tech and life.',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/images/laptop.svg`,
    favicon: `${siteURL}/images/laptop.svg`,
    copyright: `All rights reserved ${date.getFullYear()}, Rahul Tarak`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss`
    },
    author
  })

  posts.forEach(post => {
    const url = `${siteURL}/posts/${post.slug}`

    feed.addItem({
      title: post.name,
      id: url,
      link: url,
      description: post.preview,
      content: post.preview,
      author: [author],
      contributor: [author],
      date: new Date(post.date)
    })
  })

  return feed
}
