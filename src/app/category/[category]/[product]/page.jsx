"use client";
import Image from "next/image";
import Slider from "react-slick";
import { debounce } from "lodash";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/slices/cartSlice";
import RatingDisplay from "@/components/RatingDisplay";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { calculateDiscount, configure } from "@/utils/misc";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheckBig, Heart } from "lucide-react";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/redux/slices/favoriteSlice";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function ProductDetailPage() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { isDark } = useSelector((state) => state.theme);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { favorites } = useSelector((state) => state.favorites);
  const { cart } = useSelector((state) => state.cart);
  const product = JSON.parse(decodeURIComponent(searchParams.get("product")));
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  useEffect(() => {
    const isFav = favorites.some((favorite) => favorite._id === product._id);
    setIsFavorite(isFav);
  }, [favorites]);
  useEffect(() => {
    const isAdded = cart.some((cartItem) => cartItem._id === product._id);
    setIsAddedToCart(isAdded);
  }, [cart]);
  const showToast = (icon, message, variant) => {
    toast({
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {icon}
          {message}
        </div>
      ),
      variant,
    });
  };
  const handleFavorite = debounce(() => {
    if (isAuthenticated) {
      const config = configure(user.token);
      if (isFavorite) {
        setIsFavorite(false);
        dispatch(removeFromFavorites({ product, config })).catch(() =>
          showToast(<CircleAlert />, "Failed to remove favorite", "destructive")
        );
        showToast(
          <CircleCheckBig />,
          "Product removed from favorites",
          "success"
        );
      } else {
        setIsFavorite(true);
        dispatch(addToFavorites({ product, config })).catch(() =>
          showToast(<CircleAlert />, "Failed to add to favorite", "destructive")
        );
        showToast(<CircleCheckBig />, "Product added to favorites", "success");
      }
    } else {
      showToast(
        <CircleAlert />,
        "Please login to add to favorites",
        "destructive"
      );
    }
  }, 300);
  const handleAddToCart = debounce(() => {
    if (isAuthenticated) {
      const config = configure(user.token);
      if (!isAddedToCart) {
        setIsAddedToCart(true);
        dispatch(addToCart({ product, config })).catch(() =>
          showToast(<CircleAlert />, "Failed to add to cart", "destructive")
        );
        showToast(<CircleCheckBig />, "Product added to cart", "success");
      }
    } else {
      showToast(<CircleAlert />, "Please login to add to cart", "destructive");
    }
  });
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
              <p
                className={`${
                  isDark ? "text-zinc-50" : "text-zinc-950"
                } cursor-pointer capitalize`}
                onClick={() => router.push(`/category/${product.category}s`)}
              >
                {product.category}
              </p>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <p className="text-[#38B854] capitalize cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px] md:max-w-[300px] lg:max-w-[400px]">
                {product.name}
              </p>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-14 mt-5">
        <div className="lg:w-[40%]">
          <div className="relative z-20">
            <Heart
              className={`${
                isFavorite && "fill-pink-500 text-pink-500"
              } hover:fill-pink-500 hover:text-pink-500 absolute top-0 right-0 `}
              aria-label="Toggle Favorite"
              role="button"
              onClick={handleFavorite}
            />
          </div>
          <div className="slider-container">
            <Slider
              asNavFor={nav2}
              ref={(slider) => (sliderRef1 = slider)}
              arrows={false}
              infinite={true}
              slidesToShow={1}
              slidesToScroll={1}
              focusOnSelect={true}
            >
              {product.image.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={product.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    className="w-full h-56 md:h-80 object-contain"
                  />
                </div>
              ))}
            </Slider>
            <div className="thumb">
              <Slider
                asNavFor={nav1}
                ref={(slider) => (sliderRef2 = slider)}
                slidesToShow={5}
                swipeToSlide={true}
                focusOnSelect={true}
              >
                {product.image.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={product.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="lg:w-[60%]">
          <p className="md:text-lg mb-3 md:mb-5 underline underline-offset-4 decoration-[#FFC501] font-semibold">
            Product Information
          </p>
          <h1 className="text-xl capitalize font-semibold">{product.name}</h1>
          <RatingDisplay rating={product.rating} />
          <div className="my-5">
            <p className="text-2xl font-semibold text-[#38B854]">
              ₹
              {calculateDiscount(
                product.price,
                product.discount
              ).toLocaleString("en-IN")}
            </p>
            <p className="text-xs">(Inclusive all Taxes)</p>
            <div
              className={`h-[1px] ${
                isDark ? "bg-zinc-50" : "bg-zinc-950"
              } my-3`}
            />
            <p className="text-zinc-500 line-through">
              MRP: ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-zinc-500">
              Discount: {product.discount}% off (Save ₹
              {(
                product.price -
                parseInt(calculateDiscount(product.price, product.discount))
              ).toLocaleString("en-IN")}
              )
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              className="bg-[#38B854] text-white hover:bg-[#38B854]/70 hover:text-white"
              onClick={handleAddToCart}
            >
              {isAddedToCart ? "Added to Cart" : "Add to Cart"}
            </Button>
            <Button className="bg-transparent text-[#38B854]">Buy Now</Button>
          </div>
          <div className="my-5 border rounded-md p-5">
            <p className="font-semibold mb-3">Key Features</p>
            <ul className="space-y-1">
              {product.description.split("\n").map((spec, index) => (
                <li key={index} className="flex gap-1">
                  <p>• {spec}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
