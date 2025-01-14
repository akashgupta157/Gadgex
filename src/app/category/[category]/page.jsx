"use client";
import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";
import { BeatLoader } from "react-spinners";
import ProductCard from "@/components/ProductCard";
import { useParams, useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function Category() {
  const router = useRouter();
  const category = useParams().category.slice(0, -1).split("%20").join(" ");
  const { isDark } = useSelector((state) => state.theme);
  const { products, loading } = useSelector((state) => state.products);
  return (
    <div
      className={`${
        isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"
      } px-3 md:px-5 lg:px-10 py-5 md:py-10`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage
              className={`${
                isDark ? "text-zinc-50" : "text-zinc-950"
              } cursor-pointer`}
              onClick={() => router.push("/")}
            >
              Home
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage
              className={`${
                isDark ? "text-zinc-50" : "text-zinc-950"
              } cursor-pointer`}
            >
              Category
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <p className="text-[#38B854] capitalize cursor-pointer">
                {category}
              </p>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-5 md:mt-10 w-full lg:flex">
        <Sidebar />
        {loading ? (
          <div className="w-full lg:min-h-[50vh] flex items-center justify-center">
            <BeatLoader color="#38B854" />
          </div>
        ) : (
          <>
            {products?.products?.length === 0 ? (
              <div className="text-center font-medium text-xl lg:w-[75%]">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-[75%] gap-5">
                {products?.products?.map((product, index) => (
                  <ProductCard key={index} product={product} isDark={isDark} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
