"use client";

// GHI CHÚ QUAN TRỌNG:
// Tương tự như trước, <Link> và <Image> đã được thay bằng <a> và <img>
// để khắc phục lỗi biên dịch trong môi trường xem trước.
// TRONG DỰ ÁN NEXT.JS, bạn nên đổi lại thành <Link> và <Image> của Next.js.
// import Link from "next/link";
// import Image from "next/image";
import { ChevronRight } from "lucide-react"; // Icon cho breadcrumb
import Image from "next/image";
import Link from "next/link";
// Dữ liệu cho TẤT CẢ các danh mục
const allCategories = [
  {
    title: "TEM NHÃN",
    href: "/danh-muc/tem-nhan",
    imageUrl: "https://placehold.co/400x300/e2e8f0/333?text=Tem+Nhãn",
    alt: "Hình ảnh danh mục Tem Nhãn",
  },
  {
    title: "HỘP GIẤY",
    href: "/danh-muc/hop-giay",
    imageUrl: "https://placehold.co/400x300/e2e8f0/333?text=Hộp+Giấy",
    alt: "Hình ảnh danh mục Hộp Giấy",
  },
  {
    title: "CATALOGUE",
    href: "/danh-muc/catalogue",
    imageUrl: "https://placehold.co/400x300/e2e8f0/333?text=Catalogue",
    alt: "Hình ảnh danh mục Catalogue",
  },
  {
    title: "BROCHURE/TỜ RƠI",
    href: "/danh-muc/brochure",
    imageUrl: "https://placehold.co/400x300/e2e8f0/333?text=Brochure",
    alt: "Hình ảnh danh mục Brochure/Tờ Rơi",
  },
  {
    title: "THIỆP CƯỚI",
    href: "/danh-muc/thiep-cuoi",
    imageUrl: "https://placehold.co/400x300/e2e8f0/333?text=Thiệp+Cưới",
    alt: "Hình ảnh danh mục Thiệp Cưới",
  },
  {
    title: "NAMECARD",
    href: "/danh-muc/namecard",
    imageUrl: "https://placehold.co/400x300/e2e8f0/333?text=Namecard",
    alt: "Hình ảnh danh mục Namecard",
  },
  {
    title: "VOUCHER",
    href: "/danh-muc/voucher",
    imageUrl: "https://placehold.co/400x300/e2e8f0/333?text=Voucher",
    alt: "Hình ảnh danh mục Voucher",
  },
  {
    title: "BAO LÌ XÌ",
    href: "/danh-muc/bao-li-xi",
    imageUrl: "https://placehold.co/400x300/e2e8f0/333?text=Bao+Lì+Xì",
    alt: "Hình ảnh danh mục Bao Lì Xì",
  },
];

// Đây là component cho trang /danh-muc
const AllCategoriesPage = () => {
  return (
    <div className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 1. Breadcrumbs */}
        <nav className="mb-6 flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Trang chủ
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="font-medium text-gray-800">Danh mục</span>
        </nav>

        {/* 2. Tiêu đề */}
        <div className="mb-10 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            DANH MỤC
          </h1>
        </div>

        {/* 3. Lưới tất cả danh mục */}
        {/* Phong cách card mới (ảnh trên, chữ dưới) giống ảnh 08.34.11 */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {allCategories.map((category) => (
            <a
              key={category.title}
              href={category.href}
              className="group flex flex-col items-center text-center"
            >
              {/* Hình ảnh */}
              <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={category.imageUrl}
                  alt={category.alt}
                  fill
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Tên danh mục */}
              <h3 className="text-base font-semibold text-gray-700 transition-colors group-hover:text-gray-900 md:text-lg">
                {category.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesPage;
