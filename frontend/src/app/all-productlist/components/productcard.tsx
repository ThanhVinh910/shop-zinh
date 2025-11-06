import Image from "next/image";

// Định nghĩa kiểu dữ liệu cho props
interface ProductCardProps {
  title: string;
  category: string;
  imageUrl: string;
}

const ProductCard = ({ title, category, imageUrl }: ProductCardProps) => {
  return (
    <div className="group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Phần hình ảnh */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {/* Phần nội dung text */}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-base uppercase">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
