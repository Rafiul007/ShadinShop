import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice";
import cartReducer from "./features/cart/cartSlice";
import {
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
} from "./utils/localStorage";

const preloadedState = {
  cart: loadCartFromLocalStorage() || {
    products: [],
    quantity: 0,
    total: 0,
  },
};

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
});

export default store;
