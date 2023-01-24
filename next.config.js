/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['www.diplomarket.com', '127.0.0.1', 'localhost'],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig
