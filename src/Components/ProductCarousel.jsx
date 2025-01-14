"use client";
import axios from "axios";
import ProductCard from "./ProductCard";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function ProductCarousel({ isDark, api, title }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/${api}`);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [api]);
  return (
    <div className="px-3 md:px-5 lg:px-10 py-2 md:py-5 lg:py-10 pb-10 md:pb-14 lg:pb-16">
      <h1
        className={`text-lg md:text-2xl mb-5 md:mb-8 lg:mb-10 font-semibold my-1 ${
          isDark ? "text-zinc-50" : "text-zinc-950"
        }`}
      >
        {title}
      </h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselPrevious className="hidden" />
        <CarouselContent className="md:px-1">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} isDark={isDark} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="hidden" />
      </Carousel>
    </div>
  );
}
