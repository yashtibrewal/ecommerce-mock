// components/AddToCartButton.tsx

import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCard, getProductQuantityInCart, increaseQuantity, decreaseQuantity } from '@/store/productsSlice';
import { useSessionContext } from "@/context/Session";
import { useRouter } from "next/router";
import { Product } from '@/interfaces/Product';
import { RootState } from '@/store';

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useDispatch();
  const session = useSessionContext();
  const router = useRouter();
  const productQuantity = useSelector((state: RootState) => getProductQuantityInCart(state, product.id));

  const handleAddProduct = () => {
    if (Object.keys(session).includes('isLoggedIn')) {
      dispatch(addProductToCard(product)); // assuming productId is sufficient
    } else {
      router.push("/login");
    }
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product));
  };

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-5">
      {productQuantity > 0 ? (
        <div className="flex items-center">
          <button
            onClick={handleDecreaseQuantity}
            className="flex items-center justify-center border-2 bg-blue-500 text-white border-blue-500 rounded-l px-3 py-1 hover:bg-blue-700">
            -
          </button>
          <span className="flex items-center justify-center border-t-2 border-b-2 border-blue-500 px-3 py-1">
            {productQuantity}
          </span>
          <button
            onClick={handleIncreaseQuantity}
            className="flex items-center justify-center border-2 bg-blue-500 text-white border-blue-500 rounded-r px-3 py-1 hover:bg-blue-700">
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddProduct}
          className="tracking-tighter flex items-center justify-center border-2 bg-blue-200 border-blue-500 rounded px-3 py-1">
          Add to cart <FaShoppingCart className="ml-3" />
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
