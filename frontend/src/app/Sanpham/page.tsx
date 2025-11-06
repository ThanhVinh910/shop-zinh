"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const mockProducts = [
  {
    id: 1,
    name: "In Lịch Tết 2025",
    category: "Lịch",
    imageUrl:
      "https://himpaper.vn/data/category/TEM%20NH%C3%83N/z5308504211360_0f4899222ad8a5ae74369182a8440451-01.jpg",
  },
  {
    id: 2,
    name: "In Namecard Giá Rẻ",
    category: "Namecard",
    imageUrl:
      "https://himpaper.vn/data/category/H%E1%BB%98P%20GI%E1%BA%A4Y/M010T150_Cosmatic_Container_1-01-01.jpg",
  },
  {
    id: 3,
    name: "In Nhanh Namecard",
    category: "Namecard",
    imageUrl: "https://himpaper.vn/data/category/CATALOUGE/11610238.png",
  },
  {
    id: 4,
    name: "In Namecard Lấy Liền",
    category: "Namecard",
    imageUrl:
      "https://himpaper.vn/data/category/BROCHURE%20-%20T%E1%BB%9C%20R%C6%A0I/BROCHURE1-01.jpg",
  },
  {
    id: 5,
    name: "In Nhanh Hộp Giấy",
    category: "Hộp Giấy",
    imageUrl:
      "https://himpaper.vn/data/category/THI%E1%BB%86P%20C%C6%AF%E1%BB%9AI/z5308691804078_bc5affe8ec1f227ae538e4f6bebe09fd.jpg",
  },
  {
    id: 6,
    name: "In Hộp Mỹ Phẩm",
    category: "Hộp Giấy",
    imageUrl: "https://himpaper.vn/data/category/NAMECARD/KK-01-01.jpg",
  },
  {
    id: 7,
    name: "In Hộp Giá Rẻ",
    category: "Hộp Giấy",
    imageUrl: "https://himpaper.vn/data/category/NAMECARD/KK-01-01.jpg",
  },
  {
    id: 8,
    name: "In Danh Thiếp",
    category: "Namecard",
    imageUrl: "https://himpaper.vn/data/category/VOUCHER/voucher.jpg",
  },
  {
    id: 9,
    name: "In Hộp Giấy Theo Yêu Cầu",
    category: "Hộp Giấy",
    imageUrl:
      "https://himpaper.vn/data/category/L%E1%BB%8ACH/z5768411133518_2579b804cff0c36e86f931c2b53cf14f.jpg",
  },
  {
    id: 10,
    name: "In Menu Giá Rẻ",
    category: "Menu",
    imageUrl:
      "https://himpaper.vn/data/category/S%E1%BB%94%20TAY/notebook_mockup_05-01.jpg.png",
  },
  {
    id: 11,
    name: "In Giấy Tiêu Đề",
    category: "Ấn Phẩm Văn Phòng",
    imageUrl:
      "https://himpaper.vn/data/category/MENU/z5308594956544_8e60f3f33b198b82e94792e1e5a17022.jpg",
  },
  {
    id: 12,
    name: "In Nhãn Nhựa",
    category: "Tem Nhãn",
    imageUrl:
      "https://himpaper.vn/data/category/TAG-TH%E1%BA%BA%20TREO/z5308604775186_2244df5425b9b86e51150223e86f1ad8-01.jpg.png",
  },
];

const productCategories = [
  "Tất cả",
  "Tem Nhãn",
  "Hộp Giấy",
  "Catalogue",
  "Brochure-Tờ Rơi",
  "Thiệp Cưới",
  "Namecard",
  "Voucher",
  "Bao Lì Xì",
  "Lịch",
  "Sổ Tay",
  "Menu",
  "Tag Thẻ Treo",
  "Thẻ Nhựa Cào",
  "Ấn Phẩm Văn Phòng",
  "Túi Giấy",
];

export default function SanphamPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");

  const filtered = mockProducts.filter((p) =>
    activeCategory === "Tất cả" ? true : p.category === activeCategory
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/sanpham" className="font-medium text-orange-500">
            Sản phẩm
          </Link>
        </nav>

        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Sidebar categories */}
          <aside className="lg:col-span-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6 border-b pb-2">
              DANH MỤC
            </h2>
            <ul className="space-y-2">
              {productCategories.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left block py-1 ${
                        isActive
                          ? "font-semibold text-orange-500"
                          : "text-gray-700 hover:text-orange-500"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Products grid */}
          <section className="lg:col-span-3 mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Sản Phẩm
            </h1>

            {filtered.length === 0 ? (
              <p className="text-gray-500">
                Không có sản phẩm cho danh mục này.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/sanpham/${product.id}`} // 🔑 chữ thường, khớp với route chi tiết
                    className="group"
                  >
                    <div className="overflow-hidden rounded-lg bg-gray-200">
                      <div className="aspect-square w-full">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-gray-800">
                      {product.name}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
