"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mockProducts, allCategories } from "@/data/products";

const ITEMS_PER_PAGE = 9;

export default function SanphamPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockProducts.filter((p) =>
    activeCategoryId === 0 ? true : p.categoryId === activeCategoryId
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/sanpham" className="font-medium text-orange-500">
            Sản phẩm
          </Link>
        </nav>

        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <h2 className="mb-6 border-b pb-2 text-xl font-bold tracking-tight text-gray-900">
              DANH MỤC
            </h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange(0)}
                  className={`block w-full py-1 text-left ${
                    activeCategoryId === 0
                      ? "font-semibold text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  Tất cả
                </button>
              </li>
              {allCategories.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full py-1 text-left ${
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

          {/* Grid sản phẩm */}
          <section className="lg:col-span-3 mt-8 lg:mt-0">
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">
              Sản Phẩm
            </h1>

            {currentProducts.length === 0 ? (
              <p className="text-gray-500">
                Không có sản phẩm cho danh mục này.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {currentProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/sanpham/${product.id}`}
                      className="group"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                        <div className="relative h-full w-full">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-75"
                          />
                        </div>
                      </div>
                      <h3 className="mt-4 text-sm font-medium text-gray-800">
                        {product.name}
                      </h3>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav
                    className="mt-12 flex items-center justify-center space-x-1"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
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
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
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

      {/* ✅ Floating quick buttons – đặt NGAY TRƯỚC khi đóng div.bg-white */}
      <div
        aria-hidden="true"
        className="fixed bottom-8 right-4 z-50 flex flex-col gap-4"
        // nếu muốn tránh cụm nút đè lên footer trên iPhone có tai thỏ:
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href="tel:0834016499"
          aria-label="Gọi 0834016499"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow transition hover:scale-105"
        >
          📞
        </a>
        <a
          href="https://zalo.me/0834016499"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat Zalo 0834016499"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow transition hover:scale-105"
        >
          Z
        </a>
        <a
          href="/lienhe"
          aria-label="Mở chat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow transition hover:scale-105"
        >
          💬
        </a>
      </div>
    </div>
  );
}
