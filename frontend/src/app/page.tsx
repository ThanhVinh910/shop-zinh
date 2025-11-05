"use client";
// src/app/page.tsx
import HeroSection from "@/app/components/home/Herosection";
import ProcessSection from "@/app/components/home/Processsection"; // 1. Import

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProcessSection /> {/* 2. Thêm vào đây */}
      {/* Các section khác ... */}
    </main>
  );
}
