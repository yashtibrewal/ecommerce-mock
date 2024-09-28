/**
 * This component is used to fetch the similar products based on the product.
 */

import { useEffect, useState } from "react";
import { Product } from "@/interfaces/Product";
import ProductCard from "@/components/ProductCard";

interface SimilarProductsProps {
  category: string;
  excludeProductId: number;
}

const SimilarProducts = ({ category, excludeProductId }: SimilarProductsProps) => {
  const [similarProducts, setSimilarProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await res.json();
        const filteredProducts = data.filter((p: Product) => p.id !== excludeProductId);
        setSimilarProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to load similar products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [category, excludeProductId]);

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-4">Similar Products</h2>
      {isLoading ? (
        <p>Loading similar products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts && similarProducts.length > 0 ? (
            similarProducts.map((similarProduct) => (
              <ProductCard key={similarProduct.id} product={similarProduct} />
            ))
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;
