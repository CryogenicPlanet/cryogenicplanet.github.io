import fs from 'fs'

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
    title: "Rahul Tarak's blog",
    description: '',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/images/laptop.svg`,
    favicon: `${siteURL}/images/laptop.svg`,
    copyright: `All rights reserved ${date.getFullYear()}, Rahul Tarak`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`
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

  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}
