// productsSlice.js
import { Product } from '@/interfaces/Product';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface CartProduct extends Product {
  quantity: number;
}

const initialState: CartProduct[] = [];

const cartProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductToCard: (state, action) => {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index === -1) {
        state.push({ ...action.payload, quantity: 1 });
      } else {
        state[index].quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      if (action.payload) {
        const id = action.payload.id;
        const product = state.find(p => p.id === id);
        if (product) {
          if (product.quantity == 1) {
            // remove the product
            return state.filter(p => p.id !== id)
          } else {
            product.quantity--;
          }
        }
      }
    },
    increaseQuantity: (state, action) => {
      if (action.payload) {
        const id = action.payload.id;
        const product = state.find(p => p.id == id);
        if (product) {
          product.quantity++;
        }
      }
    },
    removeProduct: (state, action) => {
      return state.filter(p => p.id != action.payload?.id);
    },
    purchaseAllProducts: (state) => {
      state.length = 0;
    }
  }
});


// Selector for checking if an item is present in the wishlist
export const selectIsPresentInCart = (state: RootState, id: number) => {
  return state.products.some(p => p.id === id);
};

export const getProductQuantityInCart = (state: RootState, id: number | undefined) => {
  if (id == undefined) {
    return 0;
  }
  const index = state.products.findIndex(p => p.id === id);
  if (index === -1) {
    return 0;
  } else {
    return state.products[index].quantity;
  }
}

export const { addProductToCard, decreaseQuantity, increaseQuantity, removeProduct, purchaseAllProducts } = cartProductsSlice.actions;
export default cartProductsSlice.reducer;
