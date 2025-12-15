import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arkglobalworldwide.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   productionBrowserSourceMaps: false,
//   images: {
//     domains: ["arkglobalworldwide.com"],
//   },
// };

// export default nextConfig;
