/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // without this, issues with some nested paths and static exports
};

module.exports = nextConfig;
