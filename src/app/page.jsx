"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import card1 from "../../public/cards/card1.png";
import card2 from "../../public/cards/card2.png";
import card3 from "../../public/cards/card3.png";
import card4 from "../../public/cards/card4.png";
import banner1 from "../../public/banners/banner1.png";
import banner2 from "../../public/banners/banner2.png";
import banner3 from "../../public/banners/banner3.png";
import banner4 from "../../public/banners/banner4.png";
import CategoryCarousel from "@/components/CategoryCarousel";
import { Headset, TicketPercent, Truck } from "lucide-react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "@/components/ui/carousel";
import ProductCarousel from "@/components/ProductCarousel";
const images = [
  {
    src: banner1,
    bg: "bg-[#fcebf1]",
  },
  {
    src: banner2,
    bg: "bg-[#f1f7fc]",
  },
  {
    src: banner3,
    bg: "bg-[#d7e7e6]",
  },
];
export default function Home() {
  const { isDark } = useSelector((state) => state.theme);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setIndex(randomIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={`${isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"}`}>
      <Image
        src={images[index].src}
        alt="banner"
        className={`md:px-5 lg:px-10 w-full h-40 object-contain md:h-full md:pt-7 ${images[index].bg} md:bg-transparent transition-all duration-100 ease-in-out`}
      />
      <CategoryCarousel isDark={isDark} />
      <Features />
      <ProductCarousel
        isDark={isDark}
        api="/product/week-deals?limit=8"
        title="Week Deals"
      />
      <div className="md:px-5 lg:px-10">
        <Image
          src={banner4}
          alt="banner"
          className="w-full h-40 object-contain bg-[#feece9] md:h-full lg:h-80"
          priority={true}
        />
      </div>
      <CardCarousel />
      <ProductCarousel
        isDark={isDark}
        api="/product?limit=8&category=mobile"
        title="Latest Smart Phones"
      />
    </div>
  );
}
const Features = () => {
  return (
    <div className="border-y flex mb-5 md:my-5 py-5 md:py-10 w-full">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 border-r w-1/3">
        <Truck className="size-6 md:size-7" />
        <div className="text-center md:text-left">
          <h1 className="font-medium md:font-semibold text-sm md:text-base">
            Delivery
          </h1>
          <p className="text-xs text-zinc-500">₹500+ free</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 border-r w-1/3">
        <Headset className="size-6 md:size-7" />
        <div className="text-center md:text-left">
          <h1 className="font-medium md:font-semibold text-sm md:text-base">
            Support
          </h1>
          <p className="text-xs text-zinc-500">Online chat</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-1/3">
        <TicketPercent className="size-6 md:size-7" />
        <div className="text-center md:text-left">
          <h1 className="font-medium md:font-semibold text-sm md:text-base">
            Discounts
          </h1>
          <p className="text-xs text-zinc-500">Budget friendly</p>
        </div>
      </div>
    </div>
  );
};
const CardCarousel = () => {
  const cards = [card1, card2, card3, card4];
  return (
    <div className="md:px-5 lg:px-10 py-5">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Image
                src={card}
                alt={`Card ${index + 1}`}
                width={0}
                height={0}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
