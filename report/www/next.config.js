/** @type {import('next').NextConfig} */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  trailingSlash: true, // without this, issues with some nested paths and static exports
  basePath: BASE_PATH,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff2|webmanifest)$/,
      type: "asset/resource",
    });

    return config;
  },
  transpilePackages: ["@codegouvfr/react-dsfr", "tss-react"],
};

module.exports = nextConfig;
