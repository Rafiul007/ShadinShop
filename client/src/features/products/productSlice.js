import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch products with pagination for homepage
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 9 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/product?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message); 
    }
  }
);

// Fetch a single product
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/product/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message); 
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    status: "idle",
    products: [],
    product: null,
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
        state.status = "failed";
        state.error = action.payload || 'Failed to fetch products';
      })
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || 'Failed to fetch product';
      });
  },
});

export default productsSlice.reducer;
