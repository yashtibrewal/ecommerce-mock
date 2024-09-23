import { configDotenv } from 'dotenv';
configDotenv();
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  }
};

export default nextConfig;
