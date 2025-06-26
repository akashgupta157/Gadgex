"use client";
import { z } from "zod";
import axios from "axios";
import { configure } from "@/utils/misc";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { clearCart } from "@/redux/slices/cartSlice";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { setOrderData } from "@/redux/slices/razorpaySlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const checkoutSchema = z.object({
  street: z.string().min(3, "Address must be at least 3 characters."),
  city: z.string().min(3, "City must be at least 3 characters."),
  state: z.string().min(3, "State must be at least 3 characters."),
  pinCode: z
    .string()
    .length(6, "Pin Code must be exactly 6 digits.")
    .regex(/^\d+$/, "Pin Code must contain only numbers."),
  paymentOption: z.enum(["COD", "Razorpay"]),
});

export default function Checkout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isDark } = useSelector((state) => state.theme);
  const { cart } = useSelector((state) => state.cart);
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const [address, setAddress] = useState({
    country: user?.address.country || "India",
    shippingMethod: "Free",
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const config = configure(user?.token);
  console.log(user);
  const { control, handleSubmit, formState, watch } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      street: user?.address.street || "",
      city: user?.address.city || "",
      state: user?.address.state || "",
      pinCode: user?.address.pinCode || "",
      paymentOption: "COD",
    },
  });

  const selectedState = watch("state");

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            country: "India",
          }
        );
        setStates(response.data.data.states);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        setLoadingCities(true);
        try {
          const response = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: "India",
              state: selectedState,
            }
          );
          setCities(response.data.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        } finally {
          setLoadingCities(false);
        }
      };

      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const { errors } = formState;

  const onSubmit = async (addressData) => {
    const orderData = {
      products: cart,
      totalAmount: address.shippingMethod === "Free" ? total : total + 100,
      address: {
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        country: address.country,
        pinCode: addressData.pinCode,
      },
      paymentMethod: addressData.paymentOption,
    };
    if (addressData.paymentOption === "COD") {
      const { data } = await axios.post(
        "/api/user/orderhistory",
        orderData,
        config
      );
      if (data.success) {
        dispatch(clearCart());
        await axios.patch("/api/user/emptyCart", {}, config);
        redirect("/orderconfirm?id=" + data.newOrder._id);
      }
    } else {
      dispatch(setOrderData(orderData));
      redirect("/razorpay");
    }
  };
  return (
    <div
      className={`px-3 md:px-5 lg:px-10 ${
        isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"
      }`}
    >
      <div
        className="flex items-center gap-2 py-5 hover:underline cursor-pointer"
        onClick={() => redirect("/cart")}
      >
        <ChevronLeft />
        <span>Back</span>
      </div>
      <h1 className="font-medium text-lg md:text-xl lg:text-2xl">Checkout</h1>
      <div className="flex lg:flex-row flex-col-reverse justify-between gap-10 py-5">
        <form
          className="space-y-5 lg:w-[70%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between items-center bg-yellow-50 px-5 py-2 rounded text-zinc-950">
            <p>Customer Information</p>
            <p>Step 1 of 3</p>
          </div>
          <Input
            placeholder="Enter your Name"
            defaultValue={user?.name}
            className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <div className="flex justify-between items-center bg-yellow-50 px-5 py-2 rounded text-zinc-950">
            <p>Shipping Information</p>
            <p>Step 2 of 3</p>
          </div>
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your Address"
                className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
              />
            )}
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street.message}</p>
          )}
          <div className="gap-4 space-y-5 md:space-y-0 md:grid md:grid-cols-2">
            <div>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={isDark ? "bg-zinc-950" : ""}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingStates ? (
                        <SelectItem value="loading-states" disabled>
                          Loading states...
                        </SelectItem>
                      ) : states.length > 0 ? (
                        states.map((state) => (
                          <SelectItem key={state.name} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-states" disabled>
                          No states available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedState || loadingCities}
                  >
                    <SelectTrigger className={isDark ? "bg-zinc-950" : ""}>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCities ? (
                        <SelectItem value="loading-cities" disabled>
                          Loading cities...
                        </SelectItem>
                      ) : cities.length > 0 ? (
                        cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-cities" disabled>
                          {selectedState
                            ? "No cities found"
                            : "Select state first"}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
          </div>
          <div className="gap-4 space-y-5 md:space-y-0 md:grid md:grid-cols-2">
            <div>
              <Controller
                name="pinCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Pin Code"
                    className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
                  />
                )}
              />
              {errors.pinCode && (
                <p className="text-red-500 text-sm">{errors.pinCode.message}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="Country"
                className={`${isDark && "bg-zinc-950 text-zinc-50"}`}
                defaultValue={address.country}
                readOnly
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="mb-3 font-medium text-lg">Shipping Method</h1>
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
                Fast Shipping <p className="font-semibold">₹100</p>
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center bg-yellow-50 px-5 py-2 rounded text-zinc-950">
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
                      value="Razorpay"
                      checked={field.value === "Razorpay"}
                    />
                    <label>Razorpay</label>
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
          <p className="bg-yellow-50 px-5 py-3 rounded-t-md font-semibold text-zinc-950 capitalize">
            order summary
          </p>
          <div className="space-y-2 px-5 py-3">
            <p className="flex justify-between text-sm md:text-base">
              <span>Subtotal:</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </p>
            <p className="flex justify-between text-sm md:text-base">
              <span>Shipping:</span>
              <span>{address.shippingMethod === "Free" ? "FREE" : "₹100"}</span>
            </p>
            <p className="flex justify-between font-semibold text-sm md:text-base">
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
