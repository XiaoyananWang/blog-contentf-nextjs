import PostBody from '@/components/posts/PostBody'
import PostHeader from '@/components/posts/PostHeader'
import PreviewAlert from '@/components/ui/PreviewAlert'
import Skeleton from '@/components/ui/Skeleton'
import { client, previewClient } from '@/lib/contentful/client'
import { useRouter } from 'next/router'
// Want to show the content of each individual blog post
const Post = ({ post, preview }) => {
  const router = useRouter()

  return (
    <section className='section'>
      {preview && <PreviewAlert />}
      <div className='container'>
        <article className='prose mx-auto'>
          {router.isFallback ? (
            <Skeleton />
          ) : (
            <>
              <PostHeader post={post} />
              <PostBody post={post} />
            </>
          )}
        </article>
      </div>
    </section>
  )
}

// Fetch the individual blog post
export const getStaticProps = async ({ params, preview = false }) => {
  const cfClient = preview ? previewClient : client

  const { slug } = params
  // specify that fetch the content that with a slug equal to the above slug
  const response = await cfClient.getEntries({
    content_type: 'post',
    'fields.slug': slug
  })

  if (!response?.items?.length) {
    return {
      redirect: {
        destination: '/posts',
        permanent: false
      }
    }
  }

  return {
    props: {
      // access the first one in the array, actually there is only one in the array, because when setup, the slug was set to unique
      // sending the specific blog post back to the page
      post: response?.items?.[0],
      preview,
      revalidate: 60
    }
  }
}

// On any dynamic route in NextJS, need to provide getStaticPaths, which instructs NextJS which paths or which slugs it should build statically at build time
export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'post' })
  const paths = response.items.map(item => ({
    params: { slug: item.fields.slug }
  }))

  return {
    paths,
    // fallback is if the user tries to access a page that did not returned in the above paths, what should we do
    // if set to true, there might be pages that I did not return here in the paths, so try to create or generate that page on demand, show a fallback to the user (which is the loading skeleton in this case), once it's ready, it will swap the loading skeleton with the actual post and body
    // if set to false, these are the pages I have and I want you to statically build them, if user tries to access a page that other than these just 404
    // if set to blocking, similar to true, it generate that page on demand, but the only difference is that it does not show the fallback skeleton, it just blocks the user until hte page generated, so the user will see a blank page until the content is ready
    fallback: true
  }
}

export default Post