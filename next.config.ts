import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: false,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  output: "standalone",

  experimental: {
    optimizeCss: true,
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,
  },
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
