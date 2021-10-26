module.exports = {
  // Target must be serverless
  async rewrites() {
    return [
      {
        source: '/rss',
        destination: '/api/rss'
      }
    ]
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}
