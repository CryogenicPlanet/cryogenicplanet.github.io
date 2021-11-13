import axios from 'axios'

import { Post, Review } from '@interfaces/index'

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID
const NOTION_REVIEW_TABLE_ID = process.env.NOTION_REVIEW_TABLE_ID

export const getAllPosts = async (): Promise<Post[]> => {
  return await axios
    .get(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`)
    .then(res => res.data)
}

export const getAllReviews = async (): Promise<Review[]> => {
  return await axios
    .get(`https://notion-api.splitbee.io/v1/table/${NOTION_REVIEW_TABLE_ID}`)
    .then(res => res.data)
}

export type { Post, Review }
