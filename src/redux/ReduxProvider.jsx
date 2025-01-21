"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { Suspense } from "react";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </Provider>
  );
}
