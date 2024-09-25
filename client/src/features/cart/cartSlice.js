import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      const productToRemove = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (productToRemove) {
        state.quantity -= 1;
        state.total -= productToRemove.price * productToRemove.quantity;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (product) {
        product.quantity += 1;
        state.total += product.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.total -= product.price;
      } else if (product && product.quantity === 1) {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
        state.quantity -= 1;
        state.total -= product.price;
      }
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  reset,
} = cartSlice.actions;
export default cartSlice.reducer;
