// wishlistsSlice.js
import { Product } from '@/interfaces/Product';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';


const initialState: Product[] = [];

const wishlistsSlice = createSlice({
  name: 'wishlists',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      if (action.payload) {
        return state.filter(w => w.id !== action.payload.id);
      }
    }
  }
});


// Selector for checking if an item is present in the wishlist
export const selectIsPresentInWishlist = (state: RootState, id: number | undefined) => {
  if (id == undefined) {
    return false;
  }
  return state.wishlists.some(wishlistItem => wishlistItem.id === id);
};

export const { addToWishlist, removeFromWishlist } = wishlistsSlice.actions;
export default wishlistsSlice.reducer;
