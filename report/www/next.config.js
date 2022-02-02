/** @type {import('next').NextConfig} */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // without this, issues with some nested paths and static exports
  basePath: BASE_PATH,
};

module.exports = nextConfig;
