import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (config) => {
  const { data } = await axios.get("/api/user?type=cart", config);
  return data.cart;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, config }) => {
    const { data } = await axios.patch(
      "/api/user",
      {
        type: "cart",
        productId: product._id,
      },
      config
    );
    if (data.success) return product;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ product, config }) => {
    const { data } = await axios.delete("/api/user", {
      data: {
        type: "cart",
        productId: product._id,
      },
      ...config,
    });
    if (data.success) return product;
  }
);
const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [action.payload, ...state.cart];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;

export const { clearCart } = cartSlice.actions;
