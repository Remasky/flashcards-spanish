import type {NextConfig} from 'next';

const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/flashcards-spanish/' : '',
  basePath: isProd ? '/flashcards-spanish' : '',
  output: 'export'
};

export default nextConfig;
