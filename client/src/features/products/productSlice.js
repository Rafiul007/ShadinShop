import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch product with pagination for homepage
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 9 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/product?page=${page}&limit=${limit}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    status: "idle",
    products: [],
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
        state.pagination.currentPage = action.payload.pagination.currentPage;
        state.pagination.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default productsSlice.reducer;
