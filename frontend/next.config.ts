import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
    ],
    unoptimized: true, 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  
  // New additions for fixing Vercel routing issues
  reactStrictMode: true,
  trailingSlash: false,
  output: 'standalone',
  
  // Add redirects to ensure /articles works properly
  async redirects() {
    return [
      // Redirect from /articles/ (with trailing slash) to /articles (no trailing slash)
      {
        source: '/articles/',
        destination: '/articles',
        permanent: true,
      },
    ];
  },
  
  // Your existing webpack configuration
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
};

export default nextConfig;