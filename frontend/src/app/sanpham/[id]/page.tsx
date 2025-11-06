import Image from "next/image";
import Link from "next/link";

// Dữ liệu sản phẩm mẫu
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

// 🔑 generateStaticParams để Next.js build sẵn các trang chi tiết
export async function generateStaticParams() {
  return mockProducts.map((p) => ({ id: String(p.id) }));
}

// ✅ params là object, không phải Promise
export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
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
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <p className="mb-4 text-gray-700">Danh mục: {product.category}</p>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={600}
        height={400}
        className="rounded-lg shadow-md mb-6"
      />
      <p className="text-gray-700">
        Mô tả chi tiết cho sản phẩm <b>{product.name}</b>.
      </p>
    </div>
  );
}
