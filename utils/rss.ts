import axios from 'axios'
import { Feed } from 'feed'

import { Post } from '@interfaces/index'

export const generateRssFeed = async (posts: Post[]) => {
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

  for (const post of posts) {
    const url = `${siteURL}/posts/${post.slug}`

    const html = await (await axios.get(url)).data

    // console.log(html)

    feed.addItem({
      title: post.name,
      id: url,
      link: url,
      description: post.preview,
      content: html,
      author: [author],
      contributor: [author],
      category: post.categories.map(value => {
        return { name: value }
      }),
      date: new Date(post.date)
    })
  }

  return feed
}
