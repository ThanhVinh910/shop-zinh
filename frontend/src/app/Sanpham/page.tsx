"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Dữ liệu sản phẩm mẫu
const mockProducts = [
  {
    id: 1,
    name: "In Lịch Tết 2025",
    category: "Lịch",
    imageUrl: "/products/lich-tet-2025.jpg",
  },
  {
    id: 2,
    name: "In Namecard Giá Rẻ",
    category: "Namecard",
    imageUrl: "/products/namecard-giare.jpg",
  },
  {
    id: 3,
    name: "In Nhanh Namecard",
    category: "Namecard",
    imageUrl: "/products/namecard-nhanh.jpg",
  },
  {
    id: 4,
    name: "In Namecard Lấy Liền",
    category: "Namecard",
    imageUrl: "/products/namecard-laylien.jpg",
  },
  {
    id: 5,
    name: "In Nhanh Hộp Giấy",
    category: "Hộp Giấy",
    imageUrl: "/products/hop-giay-nhanh.jpg",
  },
  {
    id: 6,
    name: "In Hộp Mỹ Phẩm",
    category: "Hộp Giấy",
    imageUrl: "/products/hop-my-pham.jpg",
  },
  {
    id: 7,
    name: "In Hộp Giá Rẻ",
    category: "Hộp Giấy",
    imageUrl: "/products/hop-giay-giare.jpg",
  },
  {
    id: 8,
    name: "In Danh Thiếp",
    category: "Namecard",
    imageUrl: "/products/danh-thiep.jpg",
  },
  {
    id: 9,
    name: "In Hộp Giấy Theo Yêu Cầu",
    category: "Hộp Giấy",
    imageUrl: "/products/hop-giay-yeucau.jpg",
  },
  {
    id: 10,
    name: "In Menu Giá Rẻ",
    category: "Menu",
    imageUrl: "/products/menu-giare.jpg",
  },
  {
    id: 11,
    name: "In Giấy Tiêu Đề",
    category: "Ấn Phẩm Văn Phòng",
    imageUrl: "/products/giay-tieude.jpg",
  },
  {
    id: 12,
    name: "In Nhãn Nhựa",
    category: "Tem Nhãn",
    imageUrl: "/products/nhan-nhua.jpg",
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

export default function SanPhamPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");

  const filtered = mockProducts.filter((p) =>
    activeCategory === "Tất cả" ? true : p.category === activeCategory
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 🔹 Breadcrumbs (Thanh chỉ đường) */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/Sanpham" className="font-medium text-orange-500">
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
                    href={`/Sanpham/${product.id}`} // giả sử có route chi tiết sản phẩm
                    className="group"
                  >
                    <div className="overflow-hidden rounded-lg bg-gray-200">
                      {/* Sử dụng aspect-square nếu có plugin aspect-ratio */}
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
