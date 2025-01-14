"use client";
import { CircleCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-[90svh] w-[20svw] shadow">
      <ul className="p-5 flex flex-col gap-2">
        <li
          className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded ${
            pathname === "/admin/dashboard"
              ? "text-black bg-gray-200"
              : "text-gray-500"
          }`}
        >
          <LayoutDashboard />
          Dashboard
        </li>
        <li
          className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded ${
            pathname === "/admin/product"
              ? "text-black bg-gray-200"
              : "text-gray-500"
          }`}
        >
          <ShoppingBasket />
          Products
        </li>
        <li
          className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded ${
            pathname === "/admin/orders"
              ? "text-black bg-gray-200"
              : "text-gray-500"
          }`}
        >
          <CircleCheck />
          Orders
        </li>
      </ul>
    </div>
  );
}
