/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.diplomarket.com'],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig
