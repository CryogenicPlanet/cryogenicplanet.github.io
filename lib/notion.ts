import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

// const _run = async () => {
//   const { results } = await notion.databases.query({
//     database_id: 'a9e7a39a4f5c42f9b40cf84298804027',
//     filter: {
//       property: '2022 Release',
//       checkbox: {
//         equals: true
//       }
//     }
//   })

//   for (const result of results) {
//     console.log({ id: result.id })
//     await notion.pages.update({
//       page_id: result.id,
//       properties: {
//         'Release Year': {
//           select: {
//             name: '2022'
//           }
//         }
//       }
//     })
//   }
// }

export const addPosterToPage = async (pageId: string, poster: string) => {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      posterOverwrite: {
        url: poster
      }
    }
  })
}
