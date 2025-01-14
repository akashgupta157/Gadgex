import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (config) => {
    const { data } = await axios.get("/api/user?type=favorites", config);
    return data.favorites;
  }
);
export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async ({ product, config }) => {
    const { data } = await axios.patch(
      "/api/user",
      {
        type: "favorites",
        productId: product._id,
      },
      config
    );
    if (data.success) return product;
  }
);
export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async ({ product, config }) => {
    const { data } = await axios.delete("/api/user", {
      data: {
        type: "favorites",
        productId: product._id,
      },
      ...config,
    });
    if (data.success) return product;
  }
);
const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = [action.payload, ...state.favorites];
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (favorite) => favorite._id !== action.payload._id
        );
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default favoriteSlice.reducer;

export const { clearFavorites } = favoriteSlice.actions;
