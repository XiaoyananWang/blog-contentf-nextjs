const contentful = require('contentful')
console.log('Space ID:', process.env.CONTENTFUL_SPACE_ID);
console.log('Access Token:', process.env.CONTENTFUL_ACCESS_TOKEN);
export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

// export const previewClient = contentful.createClient({
//   host: 'preview.contentful.com',
//   space: process.env.CONTENTFUL_SPACE_ID,
//   accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
// })
