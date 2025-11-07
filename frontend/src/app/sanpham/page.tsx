"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// 🔑 BƯỚC 1: IMPORT DỮ LIỆU TỪ FILE CHUNG
import { mockProducts, allCategories } from "@/data/products"; // (Giả sử bạn có alias `@/*` trỏ đến `src/*`)
// Nếu không, hãy dùng: import { mockProducts, allCategories } from "../../data/data";

const ITEMS_PER_PAGE = 9; // 🔑 Tăng số sản phẩm mỗi trang

export default function SanphamPage() {
  // 🔑 BƯỚC 2: Dùng `0` (số) làm ID cho "Tất cả"
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔑 BƯỚC 3: Cập nhật logic lọc (dùng categoryId thay vì string)
  const filtered = mockProducts.filter((p) =>
    activeCategoryId === 0 ? true : p.categoryId === activeCategoryId
  );

  // Logic phân trang (không đổi)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // 🔑 BƯỚC 4: Cập nhật hàm (dùng `number` cho categoryId)
  const handleCategoryChange = (categoryId: number) => {
    setActiveCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb (không đổi) */}
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
          {/* 🔑 BƯỚC 5: Cập nhật Sidebar */}
          <aside className="lg:col-span-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6 border-b pb-2">
              DANH MỤC
            </h2>
            <ul className="space-y-2">
              {/* Nút "Tất cả" */}
              <li>
                <button
                  onClick={() => handleCategoryChange(0)}
                  className={`w-full text-left block py-1 ${
                    activeCategoryId === 0
                      ? "font-semibold text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  Tất cả
                </button>
              </li>
              {/* Render danh mục từ `allCategories` */}
              {allCategories.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left block py-1 ${
                        isActive
                          ? "font-semibold text-orange-500"
                          : "text-gray-700 hover:text-orange-500"
                      }`}
                    >
                      {category.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* 🔑 BƯỚC 6: Grid sản phẩm (hiển thị SẢN PHẨM THẬT) */}
          <section className="lg:col-span-3 mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Sản Phẩm
            </h1>

            {currentProducts.length === 0 ? (
              <p className="text-gray-500">
                Không có sản phẩm cho danh mục này.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {/* Map qua `currentProducts` (danh sách sản phẩm thật) */}
                  {currentProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/sanpham/${product.id}`} // Link đến trang chi tiết SẢN PHẨM
                      className="group"
                    >
                      <div className="overflow-hidden rounded-lg bg-gray-200 aspect-square">
                        <div className="relative w-full h-full">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
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

                {/* Phân trang (Không đổi) */}
                {totalPages > 1 && (
                  <nav
                    className="flex justify-center items-center space-x-1 mt-12"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300`}
                    >
                      &lt;
                    </button>
                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                          pageNumber === currentPage
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300`}
                    >
                      &gt;
                    </button>
                  </nav>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
