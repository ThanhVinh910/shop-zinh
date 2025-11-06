import Image from "next/image";
// Bước 1: Import ProductCard bạn vừa tạo
import ProductCard from "@/app/all-productlist/components/productcard"; // <-- Điều chỉnh đường dẫn này nếu bạn lưu file ở chỗ khác

// Dữ liệu mẫu, sau này bạn có thể thay bằng API
const productList = [
  {
    id: 1,
    title: "IN DECAL SỮA",
    category: "TEM NHÃN",
    imageUrl: "/images/products/decal-sua.jpg", // Thay bằng đường dẫn ảnh của bạn
  },
  {
    id: 2,
    title: "IN DECAL TRONG",
    category: "TEM NHÃN",
    imageUrl: "/images/products/decal-trong.jpg", // Thay bằng đường dẫn ảnh của bạn
  },
  {
    id: 3,
    title: "IN DECAL BẠY MÀU",
    category: "TEM NHÃN",
    imageUrl: "/images/products/decal-bay-mau.jpg", // Thay bằng đường dẫn ảnh của bạn
  },
  {
    id: 4,
    title: "IN DECAL GIẤY",
    category: "TEM NHÃN",
    imageUrl: "/images/products/decal-giay.jpg", // Thay bằng đường dẫn ảnh của bạn
  },
];

export default function TemNhanPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      {/* ===== SECTION 1: GIỚI THIỆU (HERO) ===== */}
      <section className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
        {/* Cột hình ảnh (bên trái) */}
        <div className="w-full md:w-1/2">
          <Image
            src="/images/tem-nhan-hero.jpg" // <-- THAY ẢNH NÀY (ảnh chai lọ)
            alt="Giới thiệu tem nhãn"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-auto shadow-md"
          />
        </div>
        {/* Cột nội dung (bên phải) */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
            TEM NHÃN
          </h1>
          <p className="text-gray-600 leading-relaxed">
            IN TEM NHÃN còn được gọi là in tem decal, in nhãn dán, in nhãn mác,
            in sticker, in nhãn phụ, in nhãn mác sản phẩm. In tem chống hàng
            giả... là một trong những loại tem nhãn có tính phổ biến. In nhãn
            dán cung cấp thông tin sản phẩm, lieu và đạt hiệu quả quảng cáo cao.
          </p>
        </div>
      </section>

      {/* ===== SECTION 2: DANH SÁCH SẢN PHẨM ===== */}
      <section>
        {/* Tiêu đề section và nút "Tem tất cả" */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 relative inline-block">
            SẢN PHẨM TEM NHÃN
            {/* Đường gạch chân trang trí nhỏ */}
            <span className="absolute left-0 -bottom-2 h-1 w-1/3 bg-gray-800"></span>
          </h2>
          <button className="bg-neutral-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-700 transition-colors">
            Tem tất cả
          </button>
        </div>

        {/* Lưới sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
