import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
