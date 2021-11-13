import { Review } from '@interfaces/index'

export const getSlug = (review: Review) => {
  if (review.slug) return review.slug

  const nameSlug = `${review.name.split(' ').join('-').toLowerCase()}-review`
  return nameSlug
}
