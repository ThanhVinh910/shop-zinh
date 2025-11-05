// src/app/components/layout/SearchHeader.tsx
import React from "react";

// Icon Search (dùng SVG nội tuyến cho đơn giản)
const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const SearchHeader = () => {
  return (
    // Dùng màu nền be
    <div className="bg-(--color-brand-light)">
      {/* THAY ĐỔI 1: Thêm 'justify-center' để căn giữa thanh tìm kiếm */}
      <div className="container mx-auto flex max-w-7xl items-center justify-center px-4 py-3">
        {/* Form tìm kiếm */}
        <form className="relative w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 text-sm
                       text-gray-900 placeholder:text-gray-500 {/* THAY ĐỔI 2: Thêm màu chữ và màu placeholder */}
                       focus:border-(--color-brand-primary) focus:outline-none focus:ring-1 focus:ring-(--color-brand-primary)"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <SearchIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchHeader;
