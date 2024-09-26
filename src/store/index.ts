// store.js
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // localStorage as default storage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import productsReducer from '@/store/productsSlice';
import wishlistsReducer from '@/store/wishlistsSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,  // this uses localStorage
};

// Combine multiple reducers if needed
const rootReducer = combineReducers({
  products: productsReducer,
  wishlists: wishlistsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore these actions
      },
    }),
});

export const persistor = persistStore(store);
