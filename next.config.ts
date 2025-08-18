import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  images: {
    domains: ["arkglobalworldwide.com"], // Add if using external images
  },
};

export default nextConfig;
