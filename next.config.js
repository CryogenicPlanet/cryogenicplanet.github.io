module.exports = {
  // Target must be serverless
  target: 'serverless',
  async rewrites() {
    return [
      {
        source: '/rss',
        destination: '/api/rss'
      }
    ]
  }
}
