"use client";
import axios from "axios";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function Search() {
  const router = useRouter();
  const query = useSearchParams().get("query");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useSelector((state) => state.theme);
  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/product/search?query=${query}`);
    setProducts(data.products);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [query]);
  return (
    <div
      className={`px-3 md:px-5 lg:px-10 py-5 md:py-10 ${
        isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"
      }`}
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
              Search
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <p className="text-[#38B854] capitalize cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px] md:max-w-[300px] lg:max-w-[400px]">
                {query}
              </p>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="my-5 md:my-10">
        {loading ? (
          <div className="w-full lg:min-h-[50vh] flex items-center justify-center">
            <BeatLoader color="#38B854" />
          </div>
        ) : (
          <>
            {products?.length === 0 ? (
              <div className="text-center font-medium text-xl">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {products?.map((product, index) => (
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
