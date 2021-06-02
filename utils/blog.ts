import axios from 'axios'

import { Post } from '@interfaces/index'

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID

export const getAllPosts = async (): Promise<Post[]> => {
  return await axios
    .get(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`)
    .then(res => res.data)
}

export type { Post }
