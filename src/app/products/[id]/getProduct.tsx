import Image from "next/image";
import { redirect } from "next/navigation";
import Rating from "./components/Ratings";

async function getProduct(id: string) {
  try {
    const rawResponse = await fetch(`https://fakestoreapi.com/products/${id}`);
    console.log(rawResponse);
    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse)
    return {
      success: true,
      data: jsonResponse,
      errorMessage: null
    };
  } catch (err: unknown) {
    // console.log(err);
    if (err instanceof Error) {
      return {
        success: false,
        data: null,
        errorMessage: err.message
      }
    } else {
      return {
        success: false,
        data: null,
        errorMessage: 'An unexpected error occured'
      }
    }
  }
}

export async function ProductView({ id }: { id: string }) {

  const { success, data, errorMessage } = await getProduct(id);


  if (!success) {
    redirect('/server-error');
  }

  return (
    <div>
      ProductView
      <div className="flex">

        <div className="flex w-50 h-50">
          <Image
            src={data.image}
            alt={'Product'}
            layout="fill"
          ></Image>
        </div>
        <div>
          <h1>{data.title}</h1>
          <Rating rating={data.rating.rate}></Rating>
          <h3>${data.price}</h3>
          <p>{data.description}</p>

        </div>
      </div>
    </div >
  )

}