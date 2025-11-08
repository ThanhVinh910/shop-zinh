// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ⚡ Dùng khi deploy Netlify (tạo thư mục 'out')
  images: {
    // ⚠️ Bắt buộc khi dùng output: 'export'
    unoptimized: true,

    // ✅ Cho phép hiển thị ảnh từ domain bên ngoài
    domains: ["himpaper.vn", "inkzinh.netlify.app"],
  },
};

export default nextConfig;
