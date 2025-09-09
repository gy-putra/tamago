import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
  eslint: {
    // ❌ Don't stop the build even if there are linting errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
