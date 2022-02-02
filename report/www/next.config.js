/** @type {import('next').NextConfig} */

const BASE_PATH = process.env.BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // without this, issues with some nested paths and static exports
  basePath: BASE_PATH,
};

module.exports = nextConfig;
