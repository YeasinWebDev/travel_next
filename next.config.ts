import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase to 10MB, adjust as needed
    },
  },

};

export default nextConfig;
