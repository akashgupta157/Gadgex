import React from "react";
import Image from "next/image";
import tv from "../../public/icons/tv.svg";
import ac from "../../public/icons/ac.svg";
import { useRouter } from "next/navigation";
import watch from "../../public/icons/watch.svg";
import mobile from "../../public/icons/mobile.svg";
import laptop from "../../public/icons/laptop.svg";
import tablet from "../../public/icons/tablet.svg";
import headphone from "../../public/icons/headphone.svg";
import air_purifier from "../../public/icons/air_purifier.svg";
import refrigerator from "../../public/icons/refrigerator.svg";
import washing_machine from "../../public/icons/washing_machine.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const categories = [
  {
    name: "mobiles",
    image: mobile,
  },
  {
    name: "televisions",
    image: tv,
  },
  {
    name: "laptops",
    image: laptop,
  },
  {
    name: "headphones",
    image: headphone,
  },
  {
    name: "washing machines",
    image: washing_machine,
  },
  {
    name: "air conditioners",
    image: ac,
  },
  {
    name: "air purifiers",
    image: air_purifier,
  },
  {
    name: "refrigerators",
    image: refrigerator,
  },
  {
    name: "tablets",
    image: tablet,
  },
  {
    name: "watches",
    image: watch,
  },
];
export default function CategoryCarousel({ isDark }) {
  const router = useRouter();
  return (
    <div className="px-3 py-5 lg:py-10 md:p-5 lg:px-28">
      <h1
        className={`text-lg md:text-2xl mb-5 md:mb-8 lg:mb-10 font-semibold text-center my-1 ${
          isDark ? "text-zinc-50" : "text-zinc-950"
        }`}
      >
        Popular Categories
      </h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselPrevious
          className={`hidden lg:flex ${isDark && "text-zinc-950"}`}
        />
        <CarouselContent>
          {categories.map((product, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/6">
              <div
                className="text-center flex flex-col items-center justify-center gap-3 rounded-lg cursor-pointer w-fit mx-auto"
                onClick={() => router.push(`/category/${product.name}`)}
              >
                <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 p-5 rounded-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-10 md:w-14 invert"
                  />
                </div>
                <p
                  className={`text-xs capitalize ${
                    isDark ? "text-zinc-50" : "text-zinc-950"
                  }`}
                >
                  {product.name}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext
          className={`hidden lg:flex ${isDark && "text-zinc-950"}`}
        />
      </Carousel>
    </div>
  );
}
