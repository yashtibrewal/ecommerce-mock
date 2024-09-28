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
  product: Product; // Defines the product to be added to the cart
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useDispatch(); // Hook to access Redux store dispatch
  const session = useSessionContext(); // Access session context to check login status
  const router = useRouter(); // Hook to programmatically navigate
  const productQuantity = useSelector((state: RootState) => getProductQuantityInCart(state, product.id)); // Selects product quantity from the store

  /**
   * Handles adding the product to the cart if the user is logged in; 
   * redirects to login if not.
   */
  const handleAddProduct = () => {
    if (Object.keys(session).includes('isLoggedIn')) {
      dispatch(addProductToCard(product)); // Dispatch action to add product to cart
    } else {
      router.push("/login"); // Redirect to login page
    }
  };

  /**
   * Decreases the quantity of the product in the cart.
   */
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product)); // Dispatch action to decrease product quantity
  };

  /**
   * Increases the quantity of the product in the cart.
   */
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product)); // Dispatch action to increase product quantity
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
