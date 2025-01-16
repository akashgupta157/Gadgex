"use client";
import { z } from "zod";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  stress: z.string().min(3, "Address must be at least 3 characters."),
  city: z.string().min(3, "City must be at least 3 characters."),
  state: z.string().min(3, "State must be at least 3 characters."),
  pinCode: z
    .string()
    .length(6, "Pin Code must be exactly 6 digits.")
    .regex(/^\d+$/, "Pin Code must contain only numbers."),
  paymentOption: z.enum(["COD", "Card", "Paypal"]),
});

export default function Checkout() {
  const { user } = useSelector((state) => state.user);
  const { isDark } = useSelector((state) => state.theme);
  const { cart } = useSelector((state) => state.cart);
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const [address, setAddress] = useState({
    country: user?.address.country || "India",
    shippingMethod: "Free",
  });

  const { control, handleSubmit, setValue, watch, formState } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      stress: user?.address.stress || "",
      city: user?.address.city || "",
      state: user?.address.state || "",
      pinCode: user?.address.pinCode || "",
      paymentOption: "COD",
    },
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div
      className={`px-3 md:px-5 lg:px-10 ${
        isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2 py-5">
        <ChevronLeft />
        <span
          className="cursor-pointer hover:underline"
          onClick={() => redirect("/cart")}
        >
          Back
        </span>
      </div>
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium">Checkout</h1>
      <div className="py-5 flex justify-between flex-col-reverse gap-10 lg:flex-row">
        <form
          className="lg:w-[70%] space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="bg-yellow-50 text-zinc-950 flex justify-between items-center px-5 py-2 rounded">
            <p>Customer Information</p>
            <p>Step 1 of 3</p>
          </div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your Name"
                value={user?.name}
                className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <div className="bg-yellow-50 text-zinc-950 flex justify-between items-center px-5 py-2 rounded">
            <p>Shipping Information</p>
            <p>Step 2 of 3</p>
          </div>
          <Controller
            name="stress"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your Address"
                className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
              />
            )}
          />
          {errors.stress && (
            <p className="text-red-500 text-sm">{errors.stress.message}</p>
          )}
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your City"
                className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
              />
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your State"
                className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
              />
            )}
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
          <Input
            placeholder="Enter your Country"
            className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
            defaultValue={address.country}
            readOnly
          />
          <Controller
            name="pinCode"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your Pin Code"
                className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
              />
            )}
          />
          {errors.pinCode && (
            <p className="text-red-500 text-sm">{errors.pinCode.message}</p>
          )}
          <div className="space-y-2">
            <h1 className="font-medium text-lg mb-3">Shipping Method</h1>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value="Free"
                onChange={(e) =>
                  setAddress({ ...address, shippingMethod: e.target.value })
                }
                checked={address.shippingMethod === "Free"}
              />
              <label htmlFor="shipping">Free Shipping</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value="Standard"
                onChange={(e) =>
                  setAddress({ ...address, shippingMethod: e.target.value })
                }
                checked={address.shippingMethod === "Standard"}
              />
              <label htmlFor="shipping" className="flex gap-3">
                Standard Shipping <p className="font-semibold">₹100</p>
              </label>
            </div>
          </div>
          <div className="bg-yellow-50 text-zinc-950 flex justify-between items-center px-5 py-2 rounded">
            <p>Payment</p>
            <p>Step 3 of 3</p>
          </div>
          <div className="space-y-2">
            <Controller
              name="paymentOption"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      {...field}
                      type="radio"
                      value="COD"
                      checked={field.value === "COD"}
                    />
                    <label>Cash on Delivery</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      {...field}
                      type="radio"
                      value="Card"
                      checked={field.value === "Card"}
                    />
                    <label>Card</label>
                  </div>
                  {watch("paymentOption") === "Card" && (
                    <div className="space-y-2 border w-[50%] p-10 rounded">
                      <Input
                        placeholder="Card Number"
                        className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
                      />
                      <Input
                        placeholder="Card Holder Name"
                        className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
                      />
                      <div className="flex justify-between gap-5">
                        <Input
                          placeholder="Expiry Date"
                          className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
                        />
                        <Input
                          placeholder="CVV"
                          className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      {...field}
                      type="radio"
                      value="Paypal"
                      checked={field.value === "Paypal"}
                    />
                    <label>Paypal</label>
                  </div>
                </div>
              )}
            />
          </div>
          <div className="flex justify-center py-5">
            <Button className="w-[50%]" type="submit">
              Complete checkout
            </Button>
          </div>
        </form>
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
              <span>₹{total.toLocaleString("en-IN")}</span>
            </p>
            <p className="flex justify-between text-sm md:text-base">
              <span>Shipping:</span>
              <span>{address.shippingMethod === "Free" ? "FREE" : "₹100"}</span>
            </p>
            <p className="flex justify-between text-sm md:text-base font-semibold">
              <span>Order Total:</span>
              <span>
                ₹
                {address.shippingMethod === "Free"
                  ? total.toLocaleString("en-IN")
                  : (total + 100).toLocaleString("en-IN")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
