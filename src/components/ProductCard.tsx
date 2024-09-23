// components/ProductCard.tsx
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { Product } from "@/interfaces/Product";
import Rating from "@/components/Rating";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border p-4 rounded bg-slate-50">
      <div className="relative h-48 w-full mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <h3 className="font-semibold">{product.title}</h3>
      <Rating rating={product.rating.rate} count={product.rating.count} />
      <h4 className="text-xl font-bold">${product.price}</h4>
    </div>
  );
};

export default ProductCard;
