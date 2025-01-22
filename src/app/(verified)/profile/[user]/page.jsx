"use client";
import axios from "axios";
import Image from "next/image";
import { configure } from "@/utils/misc";
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
            onClick={() => {
              dispatch(removeUser());
            }}
          >
            <LogOut className="size-5" />
            Logout
          </TabsTrigger>
        </TabsList>
        <div className="md:flex-1 md:pl-5 pt-14 px-3 md:p-0 md:border-l">
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
        <div className="my-5 space-y-5 md:my-10">
          <div className="text-center font-medium text-xl">
            You have {favorites?.length} favorite items.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <div className="my-10 text-center font-medium text-xl">
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
  console.log(state);
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
        <div className="w-full lg:min-h-[50vh] flex items-center justify-center">
          <BeatLoader color="#38B854" />
        </div>
      ) : (
        <div className="my-5 space-y-5 md:my-10">
          {state.orders?.length === 0 ? (
            <div className="text-center font-medium text-xl">
              No orders found.
            </div>
          ) : (
            <div className="space-y-5">
              {state.orders?.map((order, index) => (
                <div key={index} className="border rounded-lg">
                  <div className="px-5 py-2 border-b flex flex-wrap justify-between items-start lg:items-center bg-zinc-200 rounded-t-lg">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 text-black w-full lg:w-auto">
                      <div className="w-full lg:w-auto">
                        <p className="text-xs font-medium text-gray-600 uppercase">
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
                        <p className="text-xs font-medium text-gray-600 uppercase">
                          total amount
                        </p>
                        <p>₹{order.totalAmount.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="w-full lg:w-auto">
                        <p className="text-xs font-medium text-gray-600 uppercase">
                          ship to
                        </p>
                        <p>
                          <Popover>
                            <PopoverTrigger className="flex items-center gap-1">
                              {name}
                              <ChevronDown />
                            </PopoverTrigger>
                            <PopoverContent className="text-sm">
                              <h1 className="font-semibold text-base">
                                {name}
                              </h1>
                              <p>{order.address.street}</p>
                              <p className="uppercase">
                                {order.address.city}, {order.address.state}
                              </p>
                              <p>{order.address.pinCode}</p>
                              <p>{order.address.country}</p>
                            </PopoverContent>
                          </Popover>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 w-full lg:w-auto mt-2 lg:mt-0">
                      ORDER # {order._id}
                    </p>
                  </div>
                  <div className="p-5 space-y-3">
                    {order.products.map((product, index) => (
                      <div
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
                        key={index}
                      >
                        <div className="w-[100px] h-[100px] flex justify-center items-center flex-shrink-0">
                          <Image
                            src={product.image[0]}
                            width={100}
                            height={100}
                            alt="product"
                          />
                        </div>
                        <p className="text-sm font-medium">{product.name}</p>
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
