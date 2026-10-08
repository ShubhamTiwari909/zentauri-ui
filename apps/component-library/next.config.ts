import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/toolbar",
        destination: "/preview/components/toolbar",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
    ],
  },
  transpilePackages: [
    "@zentauri-ui/shared",
    "@zentauri-ui/zentauri-components",
  ],
};

export default nextConfig;
