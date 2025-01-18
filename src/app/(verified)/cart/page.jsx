"use client";
import React from "react";
import Image from "next/image";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../../../../public/emptyCart.svg";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { calculateDiscount, configure } from "@/utils/misc";
import { addToFavorites } from "@/redux/slices/favoriteSlice";
export default function Cart() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { isDark } = useSelector((state) => state.theme);
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
  const config = configure(user?.token);
  const handleFavorite = debounce((product) => {
    dispatch(addToFavorites({ product, config }));
    dispatch(removeFromCart({ product, config }));
    showToast(<CircleCheckBig />, "Added to favorites", "success");
  }, 300);
  const handleRemoveFromCart = debounce((product) => {
    dispatch(removeFromCart({ product, config }));
    showToast(<CircleCheckBig />, "Removed from cart", "success");
  }, 300);
  return (
    <div
      className={`px-3 md:px-5 lg:px-10 ${
        isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"
      }`}
    >
      {cart?.length ? (
        <div className="md:py-5 lg:py-10">
          <h1 className="hidden md:block uppercase text-lg lg:text-xl">
            shopping bag ({cart?.length})
          </h1>
          <div className="w-full flex flex-col-reverse py-5 lg:py-0 lg:flex-row gap-5 lg:gap-10">
            <div className="space-y-5 lg:w-[75%] mt-5">
              {cart?.map((product) => (
                <div
                  key={product._id}
                  className={`w-full flex flex-wrap md:flex-nowrap items-center gap-3 shadow hover:shadow-md cursor-pointer rounded-md p-5 md:py-0 ${
                    isDark && "border"
                  }`}
                >
                  <Image
                    src={product.image[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[40%] mx-auto md:w-[20%] h-[150px] md:h-[200px] object-contain"
                    alt={product.name}
                  />
                  <div className="w-full md:w-[60%] space-y-3 md:space-y-5">
                    <p className="text-sm md:text-base">{product.name}</p>
                    <div className="flex gap-2 md:gap-3">
                      <Button
                        className={`bg-transparent hover:bg-[#38B854] hover:border-[#38B854] hover:text-zinc-50 border ${
                          isDark
                            ? "text-zinc-50"
                            : "text-zinc-950 border-zinc-950"
                        } text-xs md:text-sm`}
                        onClick={() => handleFavorite(product)}
                      >
                        Move to Favorites
                      </Button>
                      <Button
                        className={`bg-transparent hover:bg-red-500 hover:border-red-500 hover:text-zinc-50 border ${
                          isDark
                            ? "text-zinc-50"
                            : "text-zinc-950 border-zinc-950"
                        } text-xs md:text-sm`}
                        onClick={() => handleRemoveFromCart(product)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="w-full md:w-[20%] flex flex-col items-end">
                    <p className="text-lg md:text-2xl font-semibold text-[#38B854]">
                      ₹
                      {calculateDiscount(
                        product.price,
                        product.discount
                      ).toLocaleString("en-IN")}
                      .00
                    </p>
                    <p className="text-xs md:py-2">(Incl. all Taxes)</p>
                    <div
                      className={`w-[40%] md:w-[80%] h-[1px] ${
                        isDark ? "bg-zinc-50" : "bg-zinc-950"
                      }`}
                    />
                    <p className="line-through text-xs md:text-sm pt-1 md:pt-2">
                      MRP ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-zinc-500">
                      (Save ₹
                      {(
                        product.price -
                        parseInt(
                          calculateDiscount(product.price, product.discount)
                        )
                      ).toLocaleString("en-IN")}
                      )
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`shadow w-full md:w-[50%] lg:w-[25%] h-fit rounded-md ${
                isDark && "border"
              }`}
            >
              <p className="capitalize font-semibold px-5 py-3 bg-yellow-50 rounded-t-md text-zinc-950">
                order summary
              </p>
              <div className="px-5 py-3 space-y-2">
                <p className="flex justify-between text-sm md:text-base">
                  <span>Subtotal:</span>
                  <span>
                    ₹
                    {cart
                      ?.reduce(
                        (acc, item) =>
                          acc + calculateDiscount(item.price, item.discount),
                        0
                      )
                      .toLocaleString("en-IN")}
                  </span>
                </p>
                <p className="flex justify-between text-sm md:text-base">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </p>
                <p className="flex justify-between text-sm md:text-base font-semibold">
                  <span>Order Total:</span>
                  <span>
                    ₹
                    {cart
                      ?.reduce(
                        (acc, item) =>
                          acc + calculateDiscount(item.price, item.discount),
                        0
                      )
                      .toLocaleString("en-IN")}
                  </span>
                </p>
                <Button
                  className={`w-full text-xs md:text-sm py-2 ${
                    isDark
                      ? "bg-zinc-50 text-zinc-950 hover:bg-zinc-50/80"
                      : "bg-zinc-950 text-zinc-50"
                  }`}
                  onClick={() => router.push("/checkout")}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 h-[70svh]">
          <Image
            src={emptyCart}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="size-36 md:size-48 mx-auto"
            alt="Empty Cart"
          />
          <p className="text-center text-base md:text-xl font-medium">
            You have no items in your cart.
          </p>
        </div>
      )}
    </div>
  );
}
