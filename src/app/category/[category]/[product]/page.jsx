"use client";
import Image from "next/image";
import Slider from "react-slick";
import { debounce } from "lodash";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/slices/cartSlice";
import RatingDisplay from "@/components/RatingDisplay";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiscount, configure } from "@/utils/misc";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheckBig, Heart } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const ProductDetailPage = React.memo(() => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { isDark } = useSelector((state) => state.theme);
  const { favorites } = useSelector((state) => state.favorites);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  const product = JSON.parse(decodeURIComponent(searchParams.get("product")));

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  useEffect(() => {
    setIsFavorite(favorites.some((favorite) => favorite._id === product._id));
  }, [favorites, product._id]);

  useEffect(() => {
    setIsAddedToCart(cart.some((cartItem) => cartItem._id === product._id));
  }, [cart, product._id]);

  const showToast = useCallback(
    (icon, message, variant) => {
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
    },
    [toast]
  );

  const handleFavorite = debounce(() => {
    if (isAuthenticated) {
      const config = configure(user.token);
      if (isFavorite) {
        dispatch(removeFromFavorites({ product, config }))
          .then(() => {
            setIsFavorite(false);
            showToast(
              <CircleCheckBig />,
              "Product removed from favorites",
              "success"
            );
          })
          .catch(() =>
            showToast(
              <CircleAlert />,
              "Failed to remove favorite",
              "destructive"
            )
          );
      } else {
        dispatch(addToFavorites({ product, config }))
          .then(() => {
            setIsFavorite(true);
            showToast(
              <CircleCheckBig />,
              "Product added to favorites",
              "success"
            );
          })
          .catch(() =>
            showToast(
              <CircleAlert />,
              "Failed to add to favorite",
              "destructive"
            )
          );
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
        dispatch(addToCart({ product, config }))
          .then(() => {
            setIsAddedToCart(true);
            showToast(<CircleCheckBig />, "Product added to cart", "success");
          })
          .catch(() =>
            showToast(<CircleAlert />, "Failed to add to cart", "destructive")
          );
      }
    } else {
      showToast(<CircleAlert />, "Please login to add to cart", "destructive");
    }
  }, 300);

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
              } cursor-pointer capitalize`}
              onClick={() => router.push(`/category/${product.category}s`)}
            >
              {product.category || "Category"}
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
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-14 my-5 lg:my-10">
        <div className="lg:w-[40%]">
          <div className="relative z-20">
            <Heart
              className={`${
                isFavorite && "fill-pink-500 text-pink-500"
              } hover:fill-pink-500 hover:text-pink-500 absolute top-0 right-0 `}
              aria-label="Toggle Favorite"
              aria-pressed={isFavorite}
              role="button"
              onClick={handleFavorite}
            />
          </div>
          <div className="slider-container">
            <Slider
              asNavFor={nav2}
              ref={sliderRef1}
              arrows={false}
              infinite
              slidesToShow={1}
              slidesToScroll={1}
              focusOnSelect
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
                ref={sliderRef2}
                slidesToShow={5}
                swipeToSlide
                focusOnSelect
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
          <h1 className="text-lg md:text-xl capitalize font-semibold">
            {product.name}
          </h1>
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
            <div className="h-[1px] bg-gray-300 my-3" />
            <p className="text-zinc-500 line-through text-sm md:text-base">
              MRP: ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-zinc-500 text-sm md:text-base pt-1">
              Discount: {product.discount}% off (Save ₹
              {(
                product.price -
                calculateDiscount(product.price, product.discount)
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
        </div>
      </div>
      <Tabs defaultValue="description">
        <TabsList className="w-full flex justify-start items-end bg-transparent p-0 gap-0">
          <TabsTrigger
            value="description"
            className="border-b border-gray-300 rounded-none md:text-base data-[state=active]:bg-transparent data-[state=active]:text-[#FFC501] data-[state=active]:border-b-2 data-[state=active]:border-[#FFC501] data-[state=active]:rounded-none"
          >
            Description
          </TabsTrigger>
          <div className="w-[2%] border-b border-gray-300"></div>
          <TabsTrigger
            value="reviews"
            className="border-b border-gray-300 rounded-none md:text-base data-[state=active]:bg-transparent data-[state=active]:text-[#FFC501] data-[state=active]:border-b-2 data-[state=active]:border-[#FFC501] data-[state=active]:rounded-none"
          >
            Reviews
          </TabsTrigger>
          <div className="w-full border-b border-gray-300"></div>
        </TabsList>
        <TabsContent value="description">
          <div className="md:text-lg py-5">
            <ul className="space-y-1">
              {product.description.split("\n").map((spec, index) => (
                <li key={index} className="flex gap-1 items-center">
                  <p>• {spec}</p>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <p className="text-lg font-semibold">No Reviews Yet</p>
            <p className="text-sm">
              Be the first to review this product. Your feedback is valuable to
              us!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

export default ProductDetailPage;
