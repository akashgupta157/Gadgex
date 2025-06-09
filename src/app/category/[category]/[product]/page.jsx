"use client";
import Image from "next/image";
import Slider from "react-slick";
import { debounce } from "lodash";
import AIChat from "@/components/AIChat";
import chatbot from "@/assets/chatbot.jpeg";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/slices/cartSlice";
import RatingDisplay from "@/components/RatingDisplay";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiscount, configure } from "@/utils/misc";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheckBig, Heart, X } from "lucide-react";
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
  const [showChat, setShowChat] = useState(false);

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
              <p className="max-w-[100px] md:max-w-[300px] lg:max-w-[400px] overflow-hidden text-[#38B854] text-ellipsis capitalize whitespace-nowrap cursor-pointer">
                {product.name}
              </p>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex lg:flex-row flex-col gap-5 lg:gap-14 my-5 lg:my-10">
        <div className="lg:w-[40%]">
          <div className="z-20 relative">
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
          <div className="overflow-hidden slider-container">
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
          <p className="mb-3 md:mb-5 font-semibold md:text-lg decoration-[#FFC501] underline underline-offset-4">
            Product Information
          </p>
          <h1 className="font-semibold text-lg md:text-xl capitalize">
            {product.name}
          </h1>
          <RatingDisplay rating={product.rating} />
          <div className="my-5">
            <p className="font-semibold text-[#38B854] text-2xl">
              ₹
              {calculateDiscount(
                product.price,
                product.discount
              ).toLocaleString("en-IN")}
            </p>
            <p className="text-xs">(Inclusive all Taxes)</p>
            <div className="bg-gray-300 my-3 h-[1px]" />
            <p className="text-zinc-500 text-sm md:text-base line-through">
              MRP: ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="pt-1 text-zinc-500 text-sm md:text-base">
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
              className="bg-[#38B854] hover:bg-[#38B854]/70 text-white hover:text-white"
              onClick={handleAddToCart}
            >
              {isAddedToCart ? "Added to Cart" : "Add to Cart"}
            </Button>
            <Button className="bg-transparent text-[#38B854]">Buy Now</Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="description">
        <TabsList className="flex justify-start items-end gap-0 bg-transparent p-0 w-full">
          <TabsTrigger
            value="description"
            className="data-[state=active]:bg-transparent border-gray-300 data-[state=active]:border-[#FFC501] border-b data-[state=active]:border-b-2 rounded-none data-[state=active]:rounded-none data-[state=active]:text-[#FFC501] md:text-base"
          >
            Description
          </TabsTrigger>
          <div className="border-gray-300 border-b w-[2%]"></div>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-transparent border-gray-300 data-[state=active]:border-[#FFC501] border-b data-[state=active]:border-b-2 rounded-none data-[state=active]:rounded-none data-[state=active]:text-[#FFC501] md:text-base"
          >
            Reviews
          </TabsTrigger>
          <div className="border-gray-300 border-b w-full"></div>
        </TabsList>
        <TabsContent value="description">
          <div className="py-5 md:text-lg">
            <ul className="space-y-1">
              {product.description.split("\n").map((spec, index) => (
                <li key={index} className="flex items-center gap-1">
                  <p>• {spec}</p>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="flex flex-col justify-center items-center py-10 text-gray-500 text-center">
            <p className="font-semibold text-lg">No Reviews Yet</p>
            <p className="text-sm">
              Be the first to review this product. Your feedback is valuable to
              us!
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {isAuthenticated && (
        <>
          {showChat || (
            <div className="right-5 bottom-5 z-50 fixed">
              <Image
                src={chatbot}
                alt="chatbot"
                width={0}
                height={0}
                className="shadow-lg rounded-full size-12 sm:size-14 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
                priority
                unoptimized
                onClick={() => setShowChat((prev) => !prev)}
              />
            </div>
          )}

          <div
            className={`fixed bottom-5 right-5 w-[calc(100%-2.5rem)] sm:w-[400px] rounded-xl bg-[#38B854] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
              showChat ? "translate-x-0" : "translate-x-[105%]"
            }`}
            style={{
              maxWidth: "calc(100% - 40px)",
              maxHeight: "80vh",
            }}
          >
            <AIChat
              productId={product._id}
              showChat={showChat}
              setShowChat={setShowChat}
            />
          </div>
        </>
      )}
    </div>
  );
});

export default ProductDetailPage;
