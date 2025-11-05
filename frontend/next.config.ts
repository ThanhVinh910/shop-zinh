import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ⚡ Giúp tạo thư mục 'out' để Netlify có thể deploy
  images: {
    unoptimized: true, // ⚡ Bắt buộc khi dùng output: 'export'
  },
};

export default nextConfig;
