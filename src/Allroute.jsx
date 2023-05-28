import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import SingleProductPage from "./Pages/SingleProductPage";
import Checkout from "./Pages/Checkout";
export default function AllRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminDashboard" element={<Dashboard />} />
        <Route path="/product/:category" element={<Products />} />
        <Route path="/product/:category/:id" element={<SingleProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}
