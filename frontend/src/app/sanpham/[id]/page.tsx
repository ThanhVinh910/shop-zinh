import Image from "next/image";
import Link from "next/link";

// 🔑 BƯỚC 1: IMPORT DỮ LIỆU TỪ FILE CHUNG
import { mockProducts, allCategories } from "@/data/products"; // (Hoặc dùng ../../data/data)

// 🔑 BƯỚC 2: generateStaticParams dùng SẢN PHẨM (mockProducts)
export async function generateStaticParams() {
  return mockProducts.map((p) => ({ id: String(p.id) }));
}

// 🔑 BƯỚC 3: Trang chi tiết SẢN PHẨM
export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Tìm SẢN PHẨM trong mảng SẢN PHẨM
  const product = mockProducts.find((p) => String(p.id) === params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-red-600">
          Không tìm thấy sản phẩm với ID: {params.id}
        </h1>
        <Link href="/sanpham" className="text-orange-500 underline">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  // (Tùy chọn) Tìm tên danh mục từ categoryId
  const category = allCategories.find((c) => c.id === product.categoryId);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/sanpham" className="hover:text-orange-500">
          Sản phẩm
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-orange-500">{product.name}</span>
      </nav>

      {/* Nội dung chi tiết */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Cột hình ảnh */}
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Cột thông tin */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="mb-4 text-lg text-gray-700">
            <span className="font-semibold">Danh mục: </span>
            <Link
              href={`/sanpham?category=${category?.id || 0}`} // (Tùy chọn: Link về trang lọc)
              className="text-orange-500 hover:underline"
            >
              {category ? category.title : "Không rõ"}
            </Link>
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* (Bạn có thể thêm nút "Liên hệ" hoặc "Báo giá" ở đây) */}
          <div className="mt-8">
            <Link
              href="/lienhe"
              className="inline-block rounded-md bg-orange-500 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              Yêu Cầu Báo Giá
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
