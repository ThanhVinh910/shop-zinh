"use client";
// src/app/page.tsx
import HeroSection from "@/components/home/Herosection";
import ProcessSection from "@/components/home/Processsection"; // 1. Import
import ProductList from "@/components/home/productlist";
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductList />
      <ProcessSection /> {/* 2. Thêm vào đây */}
      {/* Các section khác ... */}
    </main>
  );
}
