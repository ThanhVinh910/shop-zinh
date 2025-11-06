"use client";

// GHI CHÚ QUAN TRỌNG:
// Các thành phần <Link> và <Image> của Next.js đã được thay thế bằng <a> và <img>
// để khắc phục lỗi biên dịch trong môi trường xem trước (preview) này.
//
// TRONG DỰ ÁN NEXT.JS THỰC TẾ CỦA BẠN, BẠN NÊN SỬ DỤNG PHIÊN BẢN GỐC VỚI:
// import Link from "next/link";
// import Image from "next/image";
// ...để đảm bảo hiệu suất (prefetching) và tối ưu hóa hình ảnh.

import { ArrowRight } from "lucide-react"; // Icon mũi tên cho đẹp
import Image from "next/image";
import Link from "next/link";
// Dữ liệu cho các danh mục
const categories = [
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
];

const ProductCategories = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Phần tiêu đề và nút xem tất cả */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            DANH MỤC SẢN PHẨM
          </h2>
          <Link
            href="/all-productlist"
            className="rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700"
          >
            Xem tất cả
          </Link>
        </div>

        {/* Lưới danh mục sản phẩm */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              key={category.title}
              href={category.href}
              className="group relative block overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            >
              {/* Hình ảnh */}
              <div className="relative h-60 w-full overflow-hidden">
                {/* Đã thay thế Next/Image bằng <img> tiêu chuẩn.
                  Props `layout="fill"` và `objectFit="cover"` được chuyển thành inline style.
                */}
                <Image
                  src={category.imageUrl}
                  alt={category.alt}
                  fill
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                {/* Lớp phủ mờ dần từ dưới lên để chữ rõ hơn */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/60 via-black/30 to-transparent"></div>
              </div>

              {/* Tên danh mục */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-white">
                  {category.title}
                </h3>
                <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
