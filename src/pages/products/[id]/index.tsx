import { GetStaticProps } from "next";
import { Product } from "./Product";
import Rating from "../components/Rating";
import Image from "next/image";

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
    <div>
      ProductView
      <div className="flex">

        <div className="relative min-w-48 min-h-48 border bg-slate-100">
          <Image
            src={product.image}
            alt={'Product'}
            fill={true}
            style={{ objectFit: "contain" }}
          ></Image>
        </div>
        <div>
          <h1>{product.title}</h1>
          <Rating rating={4}></Rating>
          <h3>${product.price}</h3>
          <p>{product.description}</p>

        </div>
      </div>
    </div >
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