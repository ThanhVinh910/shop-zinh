"use client";

import { ChevronRight } from "lucide-react"; // Icon cho breadcrumb
import Image from "next/image";
import Link from "next/link";

// Dữ liệu cho TẤT CẢ các danh mục
const allCategories = [
  {
    id: 1,
    title: "TEM NHÃN",
    href: "/sanpham/1",
    imageUrl:
      "https://himpaper.vn/data/category/TEM%20NH%C3%83N/z5308504211360_0f4899222ad8a5ae74369182a8440451-01.jpg",
    alt: "Hình ảnh danh mục Tem Nhãn",
  },
  {
    id: 2,
    title: "HỘP GIẤY",
    href: "/sanpham/2",
    imageUrl:
      "https://himpaper.vn/data/category/H%E1%BB%98P%20GI%E1%BA%A4Y/M010T150_Cosmatic_Container_1-01-01.jpg",
    alt: "Hình ảnh danh mục Hộp Giấy",
  },
  {
    id: 3,
    title: "CATALOGUE",
    href: "/sanpham/3",
    imageUrl: "https://himpaper.vn/data/category/CATALOUGE/11610238.png",
    alt: "Hình ảnh danh mục Catalogue",
  },
  {
    id: 4,
    title: "BROCHURE/TỜ RƠI",
    href: "/sanpham/4",
    imageUrl:
      "https://himpaper.vn/data/category/BROCHURE%20-%20T%E1%BB%9C%20R%C6%A0I/BROCHURE1-01.jpg",
    alt: "Hình ảnh danh mục Brochure/Tờ Rơi",
  },
  {
    id: 5,
    title: "THIỆP CƯỚI",
    href: "/sanpham/5",
    imageUrl:
      "https://himpaper.vn/data/category/THI%E1%BB%86P%20C%C6%AF%E1%BB%9AI/z5308691804078_bc5affe8ec1f227ae538e4f6bebe09fd.jpg",
    alt: "Hình ảnh danh mục Thiệp Cưới",
  },
  {
    id: 6,
    title: "NAMECARD",
    href: "/sanpham/6",
    imageUrl: "https://himpaper.vn/data/category/NAMECARD/KK-01-01.jpg",
    alt: "Hình ảnh danh mục Namecard",
  },
  {
    id: 7,
    title: "VOUCHER",
    href: "/sanpham/7",
    imageUrl: "https://himpaper.vn/data/category/VOUCHER/voucher.jpg",
    alt: "Hình ảnh danh mục Voucher",
  },
  {
    id: 8,
    title: "BAO LÌ XÌ",
    href: "/sanpham/8",
    imageUrl:
      "https://himpaper.vn/data/category/BAO%20L%C3%8A%20X%C3%8A/gggyju-01.jpg.png",
    alt: "Hình ảnh danh mục Bao Lì Xì",
  },
  {
    id: 9,
    title: "LỊCH ",
    href: "/sanpham/9",
    imageUrl:
      "https://himpaper.vn/data/category/L%E1%BB%8ACH/z5768411133518_2579b804cff0c36e86f931c2b53cf14f.jpg",
    alt: "Hình ảnh danh mục Lịch",
  },
  {
    id: 10,
    title: "SỔ TAY",
    href: "/sanpham/10",
    imageUrl:
      "https://himpaper.vn/data/category/S%E1%BB%94%20TAY/notebook_mockup_05-01.jpg.png",
    alt: "Hình ảnh danh mục Sổ Tay",
  },
  {
    id: 11,
    title: "MENU",
    href: "/sanpham/11",
    imageUrl:
      "https://himpaper.vn/data/category/MENU/z5308594956544_8e60f3f33b198b82e94792e1e5a17022.jpg",
    alt: "Hình ảnh danh mục Menu",
  },
  {
    id: 12,
    title: "TAG - THẺ TREO",
    href: "/sanpham/12",
    imageUrl:
      "https://himpaper.vn/data/category/TAG-TH%E1%BA%BA%20TREO/z5308604775186_2244df5425b9b86e51150223e86f1ad8-01.jpg.png",
    alt: "Hình ảnh danh mục TAG - THẺ TREO",
  },
];

// Đây là component cho trang /danh-muc
const AllCategoriesPage = () => {
  return (
    <div className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 1. Breadcrumbs */}
        <nav className="mb-6 flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500">
            Trang chủ
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="font-medium text-orange-500">Danh mục</span>
        </nav>

        {/* 2. Tiêu đề */}
        <div className="mb-10 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            DANH MỤC
          </h1>
        </div>

        {/* 3. Lưới tất cả danh mục */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {allCategories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex flex-col items-center text-center"
            >
              {/* Hình ảnh - ĐÃ SỬA */}
              <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md aspect-4/3">
                <Image
                  src={category.imageUrl}
                  alt={category.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Tên danh mục */}
              <h3 className="text-base font-semibold text-gray-700 transition-colors group-hover:text-gray-900 md:text-lg">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesPage;
