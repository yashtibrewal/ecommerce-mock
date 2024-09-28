// components/AddToWishlistButton.tsx

import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, selectIsPresentInWishlist } from '@/store/wishlistsSlice';
import { RootState } from '@/store';
import { Product } from '@/interfaces/Product';

interface AddToWishlistButtonProps {
  product: Product; // Defines the product for the wishlist
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ product }) => {
  const dispatch = useDispatch(); // Hook to access Redux store dispatch
  const isInWishlist = useSelector((state: RootState) => selectIsPresentInWishlist(state, product.id)); // Selects wishlist status from the store

  /**
   * Handles adding the product to the wishlist by dispatching the appropriate action.
   */
  const handlerAddWishlist = () => {
    dispatch(addToWishlist(product)); // Dispatch action to add product to wishlist
  };

  /**
   * Handles removing the product from the wishlist by dispatching the appropriate action.
   */
  const handlerRemoveWishlist = () => {
    dispatch(removeFromWishlist(product)); // Dispatch action to remove product from wishlist
  };

  return (
    <>
      {isInWishlist ? (
        <button
          data-cy="remove-from-wishlist-button"
          onClick={handlerRemoveWishlist}
          className="tracking-tighter flex items-center justify-center border-2 bg-pink-50 border-pink-500 rounded px-3 py-1">
          Remove from wishlist <FaHeart className="ml-3" />
        </button>
      ) : (
        <button
          data-cy="add-to-wishlist-button"
          onClick={handlerAddWishlist}
          className="tracking-tighter flex items-center justify-center border-2 bg-pink-100 border-pink-500 rounded px-3 py-1">
          Add to wishlist <FaHeart className="ml-3" />
        </button>
      )}
    </>
  );
};

export default AddToWishlistButton;
