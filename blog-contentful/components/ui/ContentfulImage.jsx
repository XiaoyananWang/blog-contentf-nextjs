import Image from 'next/image'
// Use a custom loader that allows to pass in some parameters that can optimize images coming from contentful
// Unique to contentful, serves up images or assets in an optimized way
// When us a custom loader, update next.config.js, anytime you update the next.config.js, need to restart the dev server
const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}
// render a Next image and pass in all the props to the ContentfulImage component
const ContentfulImage = props => {
  return <Image loader={contentfulLoader} {...props} />
}

export default ContentfulImage