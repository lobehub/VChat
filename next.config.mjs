import nextPWA from 'next-pwa';
const isProd = process.env.NODE_ENV === 'production';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.BASE_PATH || '',
  basePath: process.env.BASE_PATH || '',
  trailingSlash: true,
  transpilePackages: ['@lobehub/ui'],
  publicRuntimeConfig: {
    root: process.env.BASE_PATH || '',
  },
};

export default isProd ? withPWA(nextConfig) : nextConfig;
