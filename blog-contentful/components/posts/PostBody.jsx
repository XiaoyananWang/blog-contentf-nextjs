import RichText from '../RichText'

const PostBody = ({ post }) => {
  const { content } = post.fields
    // console.log(content)
    // content is a json object, need to turn this object into react components 
    // need to use the contentful package, npm i @contentful/rich-text-react-renderer
    // it allows you to turn rich text documents or json objects into react components
  return (
    // If you want to style the content, which now the html tags
    // tailwind prose allows you to style html tags in bulk, install the tailwindcss/typography
    // it allows to pass the prose class to markdown files or the content that's coming from a CMS that we cannot control to putting classes on
    // when include prose class on the wrapper, it goes ahead and style those html tags inside the prode wrapper, without us having to specifically set any classes on individual tags
    // remember to add it in the tailwind config as a plugin
    <div className='mx-auto prose'>
      <RichText content={content} />
    </div>
  )
}

export default PostBody