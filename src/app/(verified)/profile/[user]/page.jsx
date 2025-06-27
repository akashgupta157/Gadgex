"use client";
import axios from "axios";
import Image from "next/image";
import { configure } from "@/utils/misc";
import { signOut } from "next-auth/react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { removeUser } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/slices/themeSlice";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  History,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Sun,
} from "lucide-react";
export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);
  const {
    user: { _id, token, name },
  } = useSelector((state) => state.user);
  const searchParams = useSearchParams();
  const tabsRefs = {
    address: useRef(null),
    favorite: useRef(null),
    order: useRef(null),
    mail: useRef(null),
    password: useRef(null),
    theme: useRef(null),
    logout: useRef(null),
  };
  const scrollToCenter = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(removeUser());
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div
      className={`md:px-5 lg:px-10 ${
        isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"
      }`}
    >
      <Tabs
        defaultValue={`${searchParams.get("tab") || "favorite"}`}
        className="md:flex"
      >
        <TabsList
          className={`h-14 md:w-[30%] lg:w-[25%] md:h-[50vh] lg:h-[70svh] md:pt-10 md:space-y-5 lg:pr-5 flex md:flex-col justify-start md:bg-transparent rounded-none 
          space-x-3 md:space-x-0 overflow-x-auto scrollbar-hide md:static fixed w-full ${
            isDark ? "bg-zinc-950 " : "bg-white"
          }`}
        >
          <TabsTrigger
            value="favorite"
            ref={tabsRefs.favorite}
            onClick={() => {
              scrollToCenter(tabsRefs.favorite);
              router.push(`/profile/${_id}?tab=favorite`);
            }}
            className={`flex-shrink-0 w-auto md:w-full flex justify-between items-center data-[state=active]:shadow-none md:data-[state=active]:bg-transparent data-[state=active]:text-[#38B854]  data-[state=active]:bg-[#38B854]/30 ${
              isDark ? "text-zinc-50" : "text-zinc-950"
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart className="size-5" />
              Favorite Products
            </div>
            <ChevronRight className="hidden md:block" />
          </TabsTrigger>
          <TabsTrigger
            value="order"
            ref={tabsRefs.order}
            onClick={() => {
              scrollToCenter(tabsRefs.order);
              router.push(`/profile/${_id}?tab=order`);
            }}
            className={`flex-shrink-0 w-auto md:w-full flex justify-between items-center data-[state=active]:shadow-none md:data-[state=active]:bg-transparent data-[state=active]:text-[#38B854]  data-[state=active]:bg-[#38B854]/30 ${
              isDark ? "text-zinc-50" : "text-zinc-950"
            }`}
          >
            <div className="flex items-center gap-2">
              <History className="size-5" />
              Order History
            </div>
            <ChevronRight className="hidden md:block" />
          </TabsTrigger>
          <TabsTrigger
            value="address"
            ref={tabsRefs.address}
            onClick={() => {
              scrollToCenter(tabsRefs.address);
              router.push(`/profile/${_id}?tab=address`);
            }}
            className={`flex-shrink-0 w-auto md:w-full flex justify-between items-center data-[state=active]:shadow-none md:data-[state=active]:bg-transparent data-[state=active]:text-[#38B854] data-[state=active]:bg-[#38B854]/30 ${
              isDark ? "text-zinc-50" : "text-zinc-950"
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="size-5" />
              Address Information
            </div>
            <ChevronRight className="hidden md:block" />
          </TabsTrigger>
          <TabsTrigger
            value="mail"
            ref={tabsRefs.mail}
            onClick={() => scrollToCenter(tabsRefs.mail)}
            className={`flex-shrink-0 w-auto md:w-full flex justify-between items-center data-[state=active]:shadow-none md:data-[state=active]:bg-transparent data-[state=active]:text-[#38B854]  data-[state=active]:bg-[#38B854]/30 ${
              isDark ? "text-zinc-50" : "text-zinc-950"
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="size-5" />
              Change Email
            </div>
            <ChevronRight className="hidden md:block" />
          </TabsTrigger>
          <TabsTrigger
            value="password"
            ref={tabsRefs.password}
            onClick={() => scrollToCenter(tabsRefs.password)}
            className={`flex-shrink-0 w-auto md:w-full flex justify-between items-center data-[state=active]:shadow-none md:data-[state=active]:bg-transparent data-[state=active]:text-[#38B854]  data-[state=active]:bg-[#38B854]/30 ${
              isDark ? "text-zinc-50" : "text-zinc-950"
            }`}
          >
            <div className="flex items-center gap-2">
              <LockKeyhole className="size-5" />
              Change Password
            </div>
            <ChevronRight className="hidden md:block" />
          </TabsTrigger>
          <TabsTrigger
            value="theme"
            ref={tabsRefs.theme}
            className={`flex-shrink-0 w-auto md:w-full flex justify-between items-center data-[state=active]:shadow-none data-[state=active]:bg-transparent ${
              isDark
                ? "text-zinc-50 data-[state=active]:text-zinc-50"
                : "data-[state=active]:text-zinc-950 text-zinc-950"
            }`}
            onClick={() => {
              scrollToCenter(tabsRefs.theme);
              dispatch(toggleTheme());
            }}
          >
            {isDark ? (
              <div className="flex items-center gap-2">
                <Sun className="size-5" />
                Light Mode
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Moon className="size-5" />
                Dark Mode
              </div>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="logout"
            ref={tabsRefs.logout}
            className={`flex-shrink-0 w-auto md:w-full flex justify-start gap-2 items-center data-[state=active]:shadow-none data-[state=active]:bg-transparent ${
              isDark ? "text-zinc-50" : "text-zinc-950"
            }`}
            onClick={handleLogout}
          >
            <LogOut className="size-5" />
            Logout
          </TabsTrigger>
        </TabsList>
        <div className="md:flex-1 md:p-0 px-3 pt-14 md:pl-5 md:border-l">
          <TabsContent value="favorite">
            <Favorite isDark={isDark} />
          </TabsContent>
          <TabsContent value="order">
            <Order token={token} name={name} />
          </TabsContent>
          <TabsContent value="address">Update your address here.</TabsContent>
          <TabsContent value="mail">Change your email here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
const Favorite = ({ isDark }) => {
  const { favorites } = useSelector((state) => state.favorites);
  return (
    <>
      {favorites?.length ? (
        <div className="space-y-5 my-5 md:my-10">
          <div className="font-medium text-xl text-center">
            You have {favorites?.length} favorite items.
          </div>
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {favorites?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="my-10 font-medium text-xl text-center">
            You have no favorite items.
          </div>
        </div>
      )}
    </>
  );
};
const Order = ({ token, name }) => {
  const config = configure(token);
  const [state, setState] = useState({
    orders: [],
    loading: true,
  });
  const fetchOrders = async () => {
    const { data } = await axios.get("/api/user/orderhistory", config);
    setState({ orders: data.orders, loading: false });
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div>
      {state.loading ? (
        <div className="flex justify-center items-center w-full lg:min-h-[50vh]">
          <BeatLoader color="#38B854" />
        </div>
      ) : (
        <div className="space-y-5 my-5 md:my-10">
          {state.orders?.length === 0 ? (
            <div className="font-medium text-xl text-center">
              No orders found.
            </div>
          ) : (
            <div className="space-y-5">
              {state.orders?.map((order, index) => (
                <div key={index} className="border rounded-lg">
                  <div className="flex flex-wrap justify-between items-start lg:items-center bg-zinc-200 px-5 py-2 border-b rounded-t-lg">
                    <div className="flex lg:flex-row flex-col items-start lg:items-center gap-5 w-full lg:w-auto text-black">
                      <div className="w-full lg:w-auto">
                        <p className="font-medium text-gray-600 text-xs uppercase">
                          order placed
                        </p>
                        <p>
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="w-full lg:w-auto">
                        <p className="font-medium text-gray-600 text-xs uppercase">
                          total amount
                        </p>
                        <p>₹{order.totalAmount.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="w-full lg:w-auto">
                        <p className="font-medium text-gray-600 text-xs uppercase">
                          ship to
                        </p>
                        <Popover>
                          <PopoverTrigger className="flex items-center gap-1">
                            {name}
                            <ChevronDown />
                          </PopoverTrigger>
                          <PopoverContent className="text-sm">
                            <h1 className="font-semibold text-base">{name}</h1>
                            <p>{order.address.street}</p>
                            <p className="uppercase">
                              {order.address.city}, {order.address.state}
                            </p>
                            <p>{order.address.pinCode}</p>
                            <p>{order.address.country}</p>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="space-y-1 mt-2 lg:mt-0 w-full lg:w-auto font-medium text-gray-600 text-sm">
                      <p>ORDER # {order._id}</p>
                      <p>Payment Method: {order.paymentMethod}</p>
                      {order.paymentMethod === "Razorpay" && (
                        <p>Razorpay Order ID: {order.razorpayOrderId}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3 p-5">
                    {order.products.map((product, index) => (
                      <div
                        className="flex sm:flex-row flex-col items-start sm:items-center gap-5"
                        key={index}
                      >
                        <div className="flex flex-shrink-0 justify-center items-center w-[100px] h-[100px]">
                          <Image
                            src={product.image[0]}
                            width={100}
                            height={100}
                            alt="product"
                          />
                        </div>
                        <p className="font-medium text-sm">{product.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
