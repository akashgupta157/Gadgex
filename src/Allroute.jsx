import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Dashboard from "./Components/Dashboard";
import Products from "./Components/Products";
import SingleProductPage from "./Components/SingleProductPage";
export default function AllRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminDashboard" element={<Dashboard />} />
        <Route path="/product/:category" element={<Products />} />
        <Route path="/product/:category/:id" element={<SingleProductPage />} />
      </Routes>
    </>
  );
}
