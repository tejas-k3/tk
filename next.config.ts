import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This allows production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
