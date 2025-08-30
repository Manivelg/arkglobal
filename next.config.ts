import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    domains: ["arkglobalworldwide.com"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.arkglobalworldwide.com",
          },
        ],
        destination: "https://arkglobalworldwide.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
