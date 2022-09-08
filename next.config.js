/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true
    }
  },
  // Target must be serverless
  async rewrites() {
    return [
      {
        source: '/rss',
        destination: '/api/rss'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/reviews/rating',
        destination: '/posts/rating',
        permanent: true
      }
    ]
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
