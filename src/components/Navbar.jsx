"use client";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { configure } from "@/utils/misc";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "@/redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { clearCart, fetchCart } from "@/redux/slices/cartSlice";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { clearFavorites, fetchFavorites } from "@/redux/slices/favoriteSlice";
import {
  CircleAlert,
  Heart,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
export default function Navbar() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState();
  const [openSignup, setOpenSignup] = useState();
  const { isDark } = useSelector((state) => state.theme);
  const { favorites } = useSelector((state) => state.favorites);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [search, setSearch] = useState(useSearchParams().get("query") || "");
  useEffect(() => {
    if (isAuthenticated) {
      const config = configure(user.token);
      dispatch(fetchFavorites(config));
      dispatch(fetchCart(config));
    } else {
      dispatch(clearFavorites());
      dispatch(clearCart());
    }
  }, [user]);
  useLayoutEffect(() => {
    if (sessionStorage.getItem("user"))
      dispatch(setUser(JSON.parse(sessionStorage.getItem("user"))));
  }, []);
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
  const handleSearch = () => {
    if (search && search.length > 3) {
      router.push(`/search?query=${search.trim()}`);
    }
  };
  return (
    <nav
      className={`sticky top-0 z-50 ${
        isDark ? "bg-zinc-950 text-zinc-50 border-b" : "bg-white"
      } shadow flex justify-between items-center px-3 py-2 md:px-5 md:py-3 lg:px-10`}
    >
      <div className="relative" onClick={() => router.push("/")}>
        <h1 className="font-bold text-4xl md:text-5xl cursor-pointer logo noSelect">
          Gadgex
        </h1>
        <div>
          <p className="bg-[#FFC501] w-1/2 h-1"></p>
          <p className="top-1 -right-1 absolute bg-[#38B854] w-1/2 h-1"></p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 px-5 py-2 border rounded-full md:w-1/2">
        <input
          type="text"
          placeholder="Search Products here"
          className="bg-transparent outline-none w-full"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Search className="cursor-pointer" onClick={handleSearch} />
      </div>
      <div className="flex items-center gap-5">
        <Popover>
          <PopoverTrigger>
            <Search className="md:hidden" />
          </PopoverTrigger>
          <PopoverContent
            className={`w-screen mt-3 ${isDark ? "bg-zinc-950" : "bg-white"}`}
          >
            <input
              type="text"
              placeholder="Search Products here"
              className={`outline-none w-full bg-transparent ${
                isDark ? "text-zinc-50" : "text-zinc-950"
              }`}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </PopoverContent>
        </Popover>
        <div
          className="hidden md:block relative cursor-pointer noSelect"
          onClick={() => {
            if (!isAuthenticated) {
              showToast(<CircleAlert />, "Please login first!", "destructive");
              return;
            }
            router.push(`/profile/${user._id}?tab=favorite`);
          }}
        >
          <Heart className="hover:fill-pink-500 hover:text-pink-500" />
          <p
            className={`absolute -top-1 -right-1 text-xs ${
              isDark ? "text-zinc-900 bg-zinc-50" : "text-zinc-50 bg-zinc-950"
            } rounded-full size-4 flex items-center justify-center`}
          >
            {favorites?.length || 0}
          </p>
        </div>
        <div
          className="relative cursor-pointer noSelect"
          onClick={() => {
            if (!isAuthenticated) {
              showToast(<CircleAlert />, "Please login first!", "destructive");
              return;
            }
            router.push(`/cart`);
          }}
        >
          <ShoppingCart />
          <p
            className={`absolute -top-1 -right-1 text-xs ${
              isDark ? "text-zinc-900 bg-zinc-50" : "text-zinc-50 bg-zinc-950"
            } rounded-full size-4 flex items-center justify-center`}
          >
            {cart?.length || 0}
          </p>
        </div>
        {isAuthenticated ? (
          <p
            onClick={() => router.push(`/profile/${user._id}`)}
            className="lg:hidden flex justify-center items-center bg-[#38B854] rounded-full size-8 text-white text-lg noSelect"
          >
            {user?.name[0].toUpperCase()}
          </p>
        ) : (
          <Login
            openLogin={openLogin}
            setOpenLogin={setOpenLogin}
            setOpenSignup={setOpenSignup}
            isDark={isDark}
          >
            <UserRound className="lg:hidden" />
          </Login>
        )}
      </div>
      <div className="hidden lg:block">
        {isAuthenticated ? (
          <div className="flex items-center gap-1 noSelect">
            <div
              onClick={() => router.push(`/profile/${user._id}`)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <p className="flex justify-center items-center bg-[#38B854] rounded-full size-9 text-white text-xl">
                {user?.name[0].toUpperCase()}
              </p>
              <p>{user?.name}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <Login
              openLogin={openLogin}
              setOpenLogin={setOpenLogin}
              setOpenSignup={setOpenSignup}
              isDark={isDark}
            >
              <p className="bg-[#38B854] hover:bg-[#38B854]/90 px-5 py-1.5 rounded text-white cursor-pointer">
                Log In
              </p>
            </Login>
            <Signup
              isDark={isDark}
              openSignup={openSignup}
              setOpenSignup={setOpenSignup}
              setOpenLogin={setOpenLogin}
            >
              <p className="px-5 py-1.5 cursor-pointer">Sign Up</p>
            </Signup>
          </div>
        )}
      </div>
    </nav>
  );
}
