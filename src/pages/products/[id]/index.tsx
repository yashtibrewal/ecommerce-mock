import { GetServerSideProps } from "next";
import Head from "next/head"; // Import Head for SEO
import Image from "next/image";

import { Product } from "@/interfaces/Product";
import Rating from "@/components/Rating";
import Layout from "@/components/Layout";
import SimilarProducts from "@/components/SimilarProduct";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/interfaces/Session";

import { useSessionContext } from "@/context/Session";
import { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCart";
import AddToWishlistButton from "@/components/AddToWishList";
import Link from "next/link";
import { capitalize } from "@/utils/functions";

interface Props {
  product: Product | null;
}

const ProductView = ({ product }: Props) => {
  const session = useSessionContext();
  const [isLoggedIn, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    setIsLogin(Object.keys(session).includes("isLoggedIn"));
  }, [session]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        {/* SEO components */}
        <title>{product.title} - MyEcommerceMock</title> {/* Set the page title */}
        <meta name="description" content={`Buy ${product.title} at the best price. Check out the details and ratings.`} /> {/* Meta description */}
        <meta property="og:title" content={product.title} /> {/* Open Graph title */}
        <meta property="og:description" content={`Discover the features of ${product.title}.`} /> {/* Open Graph description */}
        <meta property="og:image" content={product.image} /> {/* Open Graph image */}
        <meta property="og:url" content={`https://myecommercemock.com/products/${product.id}`} /> {/* Open Graph URL */}
        <meta property="og:type" content="product" /> {/* Open Graph type */}
      </Head>
      <div className="flex mx-auto w-10/12 space-x-10 mt-10">
        <div className="relative min-w-96 max-w-max min-h-96 max-h-max border bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
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
          <p className="tracking-tighter">{capitalize(product.description)}</p>
          <hr />
          {/* Use the new components */}
          <div className="flex gap-y-5 gap-x-5">
            {!isLoggedIn && (
              <div>
                <Link className="font-bold text-blue-800" href="/login">
                  Login
                </Link>{" "}
                in to add to cart
              </div>
            )}
            {isLoggedIn && <AddToCartButton product={product} />}
            {isLoggedIn && <AddToWishlistButton product={product} />}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <SimilarProducts category={product.category} excludeProductId={product.id} />
    </Layout>
  );
};

// Fetch product by ID
const fetchProductById = async (id: string): Promise<Product | null> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req, res }) => {
  const session = await getIronSession(req, res, sessionOptions);

  // Check if the id exists and is valid
  if (!params?.id || !/^\d+$/.test(params.id as string)) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  // Fetch the product
  const product = await fetchProductById(params.id as string);
  if (!product) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
      session,
    },
  };
};

export default ProductView;
