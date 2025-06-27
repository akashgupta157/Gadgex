"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { Suspense } from "react";
import { RotateCw } from "lucide-react";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <RotateCw className="w-8 h-8 animate-spin" />
          </div>
        }
      >
        {children}
      </Suspense>
    </Provider>
  );
}
