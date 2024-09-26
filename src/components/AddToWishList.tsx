// components/AddToWishlistButton.tsx

import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, selectIsPresentInWishlist } from '@/store/wishlistsSlice';
import { RootState } from '@/store';
import { Product } from '@/interfaces/Product';

interface AddToWishlistButtonProps {
  product: Product;
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ product }) => {
  const dispatch = useDispatch();
  const isInWishlist = useSelector((state: RootState) => selectIsPresentInWishlist(state, product.id));

  const handlerAddWishlist = () => {
    dispatch(addToWishlist(product));
  };

  const handlerRemoveWishlist = () => {
    dispatch(removeFromWishlist(product));
  };

  return (
    <>
      {isInWishlist ? (
        <button
          onClick={handlerRemoveWishlist}
          className="tracking-tighter flex items-center justify-center border-2 bg-pink-50 border-pink-500 rounded px-3 py-1">
          Remove from wishlist <FaHeart className="ml-3" />
        </button>
      ) : (
        <button
          onClick={handlerAddWishlist}
          className="tracking-tighter flex items-center justify-center border-2 bg-pink-100 border-pink-500 rounded px-3 py-1">
          Add to wishlist <FaHeart className="ml-3" />
        </button>
      )}
    </>
  );
};

export default AddToWishlistButton;
