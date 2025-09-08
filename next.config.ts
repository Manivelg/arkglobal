// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   productionBrowserSourceMaps: false,
//   images: {
//     domains: ["arkglobalworldwide.com"], // Add if using external images
//   },
// };

// export default nextConfig;

// next.config.js
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
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
