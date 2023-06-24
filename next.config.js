/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.BASE_PATH || "",
  basePath: process.env.BASE_PATH || "",
  trailingSlash: true,
  transpilePackages: ['@lobehub/ui'],
  publicRuntimeConfig: {
    root: process.env.BASE_PATH || "",
  },
};

module.exports = nextConfig;
