const handler = async (_, res) => {
    // clear the preview data that was set in the preview and turns the preview back to false
    res.clearPreviewData()
    // redirect the user back to the homepage
    res.writeHead(307, { Location: '/' })
    res.end()
  }
  
  export default handler