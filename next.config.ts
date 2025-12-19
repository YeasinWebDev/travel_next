import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
      bodySizeLimit: '10mb', 
    },
     optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

};

export default nextConfig;
