import axios from 'axios'

import { Movie, Post } from '@interfaces/index'

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID
const NOTION_MOVIE_TABLE_ID = process.env.NOTION_MOVIE_TABLE_ID

export const getAllPosts = async (): Promise<Post[]> => {
  return await axios
    .get(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`)
    .then(res => res.data)
}

export const getAllMovies = async (): Promise<Movie[]> => {
  return await axios
    .get(`https://notion-api.splitbee.io/v1/table/${NOTION_MOVIE_TABLE_ID}`)
    .then(res => res.data)
}

export type { Post, Movie as Review }
