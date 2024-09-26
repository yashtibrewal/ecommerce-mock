// components/ProductCard.tsx
import Image from "next/image";
import { Product } from "@/interfaces/Product";
import Rating from "@/components/Rating";
import { useRouter } from "next/router";
import AddToCartButton from "./AddToCart";
import AddToWishlistButton from "./AddToWishList";
import { useSessionContext } from "@/context/Session";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const session = useSessionContext();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(session).includes('isLoggedIn')) {
      setIsLoggedIn(true);
    }
  }, [session])

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="flex flex-col gap-y-2 border p-4 rounded bg-slate-50 hover:cursor-pointer">
      <div className="relative min-h-48 max-h-48 h-48 w-full mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <h3 className="font-semibold min-h-20">{product.title}</h3>
      <Rating rating={product.rating.rate} count={product.rating.count} />
      <h4 className="text-xl font-bold">${product.price}</h4>
      <div onClick={(e) => e.stopPropagation()} className="flex flex-wrap gap-x-5 gap-y-5 justify-center">
        {isLoggedIn && <AddToCartButton product={product}></AddToCartButton>}
        {isLoggedIn && <AddToWishlistButton product={product}></AddToWishlistButton>}
      </div>
    </div>
  );
};

export default ProductCard;
