import { GetServerSideProps } from "next";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

import { Product } from "@/interfaces/Product";
import Rating from "@/components/Rating";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard"; // Import the new ProductCard component
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/interfaces/Session";

interface Props {
  product: Product | null;
  similarProducts: Product[] | null; // Change to Product[] for better typing
}

const ProductView = ({ product, similarProducts }: Props) => {


  if (!product) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (similarProducts) {
    similarProducts = similarProducts.filter(similarProduct => similarProduct.id != product.id)
  }

  return (
    <Layout>
      <div className="flex mx-auto w-10/12 space-x-10 mt-10">
        <div className="relative min-w-96 max-w-max min-h-96 max-h-max border bg-slate-100">
          <Image
            src={product.image}
            alt={'Product'}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="p-4 space-y-5">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <hr />
          <Rating rating={product.rating.rate} count={product.rating.count} />
          <hr />
          <div>
            <h5 className="font-light tracking-tight">Price</h5>
            <h3 className="text-xl font-semibold">${product.price}</h3>
          </div>
          <hr />
          <button className="flex items-center justify-center border-2 bg-blue-200 border-blue-500 rounded p-5">
            Add to cart <FaShoppingCart className="ml-3" />
          </button>
        </div>
      </div>

      {/* Similar Products in the same category */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Similar Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts && similarProducts.length > 0 ? (
            similarProducts.map((similarProduct) => (
              <ProductCard key={similarProduct.id} product={similarProduct} />
            ))
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

const isValidId = (id: any): boolean => {
  return /^\d+$/.test(id);  // Check if the id is a positive integer
};

// Fetch product by ID
const fetchProductById = async (id: string): Promise<Product | null> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
};

// Fetch similar products by category
const fetchSimilarProducts = async (category: string): Promise<Product[]> => {
  const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  return res.ok ? res.json() : [];
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req, res }) => {
  const session = await getIronSession(req, res, sessionOptions);

  // Check if the id exists and is valid
  if (!params?.id || !isValidId(params.id)) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  // Fetch the product
  const product = await fetchProductById(params.id as string);
  if (!product) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  // Fetch similar products
  const similarProducts = await fetchSimilarProducts(product.category);

  return {
    props: {
      product,
      similarProducts,
      session,
    },
  };
};

export default ProductView;
