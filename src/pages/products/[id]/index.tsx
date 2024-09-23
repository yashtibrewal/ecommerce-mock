import { GetStaticProps } from "next";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

import { Product } from "@/interfaces/Product";
import Rating from "@/components/Rating";
import Layout from "@/components/Layout";

interface Props {
  product: Product | null;
}

const ProductView = ({ product }: Props) => {

  if (!product) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  console.log(product);

  return (
    <Layout>
      <div className="flex mx-auto w-10/12 space-x-10">
        <div className="relative min-w-96 max-w-max min-h-96 max-h-max  border bg-slate-100">
          <Image
            src={product.image}
            alt={'Product'}
            fill={true}
            style={{ objectFit: "contain" }}
          ></Image>
        </div>
        <div className="p-4 space-y-5">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <Rating rating={product.rating.rate} count={product.rating.count}></Rating>
          <div>
            <h5 className="font-light tracking-tight">Price</h5>
            <h3 className="text-xl font-semibold">${product.price}</h3>
          </div>
          <button className="flex items-center justify-center border-2 bg-blue-200 border-blue-500 rounded p-5">
            Add to cart <FaShoppingCart className="ml-3" /></button>
        </div>
      </div>
    </Layout>
  )


}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

  // console.log(params);
  try {

    if (params && params.id && typeof params.id == 'string') {
      parseInt(params.id);
      const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);

      if (!res.ok) {
        return {
          redirect: {
            destination: '/500',
            permanent: false,
          },
        };
      }

      const product = await res.json();

      return {
        props: {
          product,
        },
        revalidate: 3600,  // every product has an hour before it is stale.
      }
    }
    else {
      throw new Error('Invalid Id');
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        product: null,
      },
      revalidate: 10
    }
  }

}


export default ProductView;