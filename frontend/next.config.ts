import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  productionBrowserSourceMaps: false, // ❌ Không cho lộ file .map
  images: {
    unoptimized: true,
    domains: ["himpaper.vn", "inkzinh.netlify.app"],
  },
};


export default nextConfig;
