import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This allows production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: "export", // Enables static export
  distDir: "out", // Export directory
  basePath: "/tejas-portfolio", // Use the repository name
  assetPrefix: "/tejas-portfolio/",
};

export default nextConfig;
