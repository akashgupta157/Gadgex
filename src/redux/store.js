import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import themeReducer from "./slices/themeSlice";
import aiChatReducer from "./slices/aiChatSlice";
import productReducer from "./slices/productSlice";
import favoriteReducer from "./slices/favoriteSlice";
export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      theme: themeReducer,
      products: productReducer,
      cart: cartReducer,
      favorites: favoriteReducer,
      aiChat: aiChatReducer,
    },
  });
}

export const store = makeStore();
