const contentful = require('contentful')

// fetch published content
export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

// fetch unpublished content
export const previewClient = contentful.createClient({
  host: 'preview.contentful.com',
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
})
