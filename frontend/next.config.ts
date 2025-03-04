import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
    unoptimized: true, // Needed for static export
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  // Important for static HTML generation
  output: 'export',
  // Enable importing JSON files
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
};

export default nextConfig;