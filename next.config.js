module.exports = {
  // Target must be serverless
  async rewrites() {
    return [
      {
        source: '/rss',
        destination: '/api/rss'
      }
    ]
  }
}
