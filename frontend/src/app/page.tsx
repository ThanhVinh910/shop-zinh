"use client";
// src/app/page.tsx
import HeroSection from "@/components/home/herosection";
import ProcessSection from "@/components/home/processsection"; // 1. Import
import ProductList from "@/components/home/productlist";
import About from "@/components/home/about";
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductList />
      <ProcessSection /> {/* 2. Thêm vào đây */}
      <About /> {/* 3. Thêm vào đây */}
      {/* Các section khác ... */}
    </main>
  );
}
