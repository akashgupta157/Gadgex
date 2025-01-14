"use client";
import Image from "next/image";
import { debounce } from "lodash";
import { Button } from "./ui/button";
import RatingDisplay from "./RatingDisplay";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiscount, configure } from "@/utils/misc";
import { CircleAlert, CircleCheckBig, Heart } from "lucide-react";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/redux/slices/favoriteSlice";

export default function ProductCard({ product, isDark }) {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { favorites } = useSelector((state) => state.favorites);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
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
  useEffect(() => {
    const isFav = favorites.some((favorite) => favorite._id === product._id);
    setIsFavorite(isFav);
  }, [favorites]);
  useEffect(() => {
    const isAdded = cart.some((cartItem) => cartItem._id === product._id);
    setIsAddedToCart(isAdded);
  }, [cart]);
  return (
    <div
      className={`rounded-md shadow-md p-5 h-fit cursor-pointer ${
        isDark && "bg-zinc-900"
      }`}
      onClick={() => {
        router.push(
          `/category/${product.category}/${
            product._id
          }?product=${encodeURIComponent(JSON.stringify(product))}`
        );
      }}
    >
      <div className="relative">
        <Heart
          className={`${
            isFavorite && "fill-pink-500 text-pink-500"
          } hover:fill-pink-500 hover:text-pink-500 absolute top-0 right-0`}
          aria-label="Toggle Favorite"
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFavorite();
          }}
        />
      </div>
      <Image
        src={product.image[0]}
        alt={product.name}
        priority
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-48 object-contain"
      />
      <p className="text-sm text-zinc-400">{product.brand}</p>
      <p className="text-lg font-semibold line-clamp-2 text-ellipsis">
        {product.name}
      </p>
      <RatingDisplay rating={product.rating} />
      <div className="flex justify-between items-start my-3">
        <div>
          <p className="text-lg font-semibold text-[#38B854]">
            ₹
            {calculateDiscount(product.price, product.discount).toLocaleString(
              "en-IN"
            )}
          </p>
          <p className="text-sm line-through">
            MRP: ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
        <p className="text-sm text-zinc-400">{product.discount}% Off</p>
      </div>
      <Button
        className={`border bg-transparent w-full ${
          isAddedToCart
            ? "text-white bg-[#38B854] hover:bg-[#38B854]/90 border-0"
            : isDark
            ? "text-zinc-50 border-zinc-50"
            : "text-zinc-950 border-zinc-950 hover:bg-zinc-50 hover:text-zinc-950"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (isAuthenticated) {
            handleAddToCart();
          } else {
            showToast(
              <CircleAlert />,
              "Please login to add to cart",
              "destructive"
            );
          }
        }}
      >
        {isAddedToCart ? "Added to Cart" : "Add to Cart"}
      </Button>
    </div>
  );
}
