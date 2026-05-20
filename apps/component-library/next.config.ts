import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
    ],
  },
  transpilePackages: ["@zentauri-ui/zentauri-components"],
};

export default nextConfig;
