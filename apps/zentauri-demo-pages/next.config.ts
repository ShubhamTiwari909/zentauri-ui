import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  transpilePackages: [
    "@zentauri-ui/shared",
    "@zentauri-ui/zentauri-components",
  ],
};

export default nextConfig;
