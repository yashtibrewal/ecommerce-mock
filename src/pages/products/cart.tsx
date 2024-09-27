// pages/cart.tsx

import Layout from "@/components/Layout";
import { sessionOptions } from "@/interfaces/Session";
import { RootState } from "@/store";
import { getIronSession } from "iron-session";
import { GetServerSidePropsContext } from "next";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, decreaseQuantity, increaseQuantity, CartProduct, purchaseAllProducts } from "@/store/productsSlice";
import withAuth from "@/components/withAuth";
import { useState } from "react";
import Notification from "@/components/Notification";
import Image from "next/image";

const Cart = () => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // Get products from the cart state
  const cartProducts: CartProduct[] = useSelector((state: RootState) => state.products);

  // Calculate total price
  const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleRemoveProduct = (product: CartProduct) => {
    dispatch(removeProduct(product));
  };

  const handleDecreaseQuantity = (product: CartProduct) => {
    dispatch(decreaseQuantity(product));
  };

  const handleIncreaseQuantity = (product: CartProduct) => {
    dispatch(increaseQuantity(product));
  };

  const handlePurchase = () => {
    dispatch(purchaseAllProducts());
    setShowMessage(true);
  }

  return (
    <Layout>
      <div className="p-2 md:p-4 w-full md:w-8/12 flex flex-col mx-auto">
        {showMessage && <Notification
          message={"Thank you for your purchase, your bill will be emailed to you."}
          onClose={() => setShowMessage(false)}></Notification>}
        <h3 className="text-2xl font-bold mb-4">Shopping Cart</h3>
        {cartProducts.length > 0 ? (
          <div className="">
            {cartProducts.map((product) => (
              <div key={product.id} className="flex flex-wrap items-center gap-y-2 justify-center md:justify-between border-b py-4 min-h-fit">
                <h4 className="w-full font-semibold min-h-12 tracking-tighter ">{product.title}</h4>
                <div className="flex flex-wrap gap-y-2 items-center">
                  <div className="mr-4 w-full md:w-24 h-24 relative mx-auto">
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col mx-auto">
                    <div className="flex items-center mx-auto gap-x-10">
                      <div className="flex items-center">
                        <button onClick={() => handleDecreaseQuantity(product)} className="px-2 py-1 border">
                          -
                        </button>
                        <span className="mx-2">{product.quantity}</span>
                        <button onClick={() => handleIncreaseQuantity(product)} className="px-2 py-1 border">
                          +
                        </button>
                      </div>
                      <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveProduct(product)}
                  className="text-red-500 border border-red-500 px-3 py-1 rounded hover:text-white hover:bg-red-500">
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4 w-full flex flex-wrap justify-between items-center">
              <h4 className="text-base md:text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h4>
              <button
                className="border-green-500 bg-green-500 rounded px-3 py-1 hover:bg-green-600 text-white"
                onClick={handlePurchase}
              >Place Order</button>
            </div>
          </div>
        ) : (
          <p>Your cart is currently empty.</p>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getIronSession(req, res, sessionOptions);
  return {
    props: {
      session,
    },
  };
};

export default withAuth(Cart);
