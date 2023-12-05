import { previewClient } from '@/lib/contentful/client'

const handler = async (req, res) => {
  // destructuring the secret and slug out of the req
  // these are the stuff that we sent through the url that was setup in the content preview in contentful
  const { secret, slug } = req.query

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  //create the preview client
  const response = await previewClient.getEntries({
    content_type: 'post',
    'fields.slug': slug
  })

  const post = response?.items?.[0]

  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // if everyyhing goes well, set this preview data cookie 
  res.setPreviewData({})
  // and redirect the user back to the post for that slug, which is back to the dynanmic path that was defined the [slug].jsx
  // but this time, with the above cookie taht sets the preview data, the dynanmic path that was defined the [slug].jsx is going to set the preview data in NextJS
  // so with the cookie, the preview is going to be true on the content object that pass to the getStaticProps
  const url = `/posts/${post.fields.slug}`
  res.writeHead(307, { Location: url })
  res.end()
}

export default handler