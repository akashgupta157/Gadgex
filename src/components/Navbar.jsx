"use client";
import { z } from "zod";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { configure } from "@/utils/misc";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "@/redux/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, fetchCart } from "@/redux/slices/cartSlice";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { clearFavorites, fetchFavorites } from "@/redux/slices/favoriteSlice";
import {
  CircleAlert,
  CircleCheckBig,
  Eye,
  EyeOff,
  Heart,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
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
    if (localStorage.getItem("user"))
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
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
        <h1 className="logo text-4xl font-bold md:text-5xl cursor-pointer noSelect">
          Gadgex
        </h1>
        <div>
          <p className="w-1/2 h-1 bg-[#FFC501]"></p>
          <p className="w-1/2 h-1 bg-[#38B854] absolute top-1 -right-1"></p>
        </div>
      </div>
      <div className="hidden md:w-1/2 md:flex border items-center gap-2 px-5 py-2 rounded-full">
        <input
          type="text"
          placeholder="Search Products here"
          className="outline-none w-full bg-transparent"
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
          className="relative cursor-pointer hidden md:block noSelect"
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
            className="size-8 rounded-full bg-[#38B854] text-white flex items-center justify-center text-lg lg:hidden noSelect"
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
              <p className="size-9 rounded-full bg-[#38B854] text-white flex items-center justify-center text-xl">
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
              <p className="px-5 py-1.5 bg-[#38B854] hover:bg-[#38B854]/90 text-white rounded">
                Log In
              </p>
            </Login>
            <Signup
              isDark={isDark}
              openSignup={openSignup}
              setOpenSignup={setOpenSignup}
              setOpenLogin={setOpenLogin}
            >
              <p className="px-3">Sign Up</p>
            </Signup>
          </div>
        )}
      </div>
    </nav>
  );
}
const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
const Login = ({
  children,
  openLogin,
  setOpenLogin,
  setOpenSignup,
  isDark,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (credentials) => {
    setLoading(true);
    const { data } = await axios.post("/api/auth/login", credentials);
    if (data.success) {
      setLoading(false);
      toast({
        title: (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CircleCheckBig />
            {data.message}
          </div>
        ),
        variant: "success",
      });
      dispatch(setUser(data.user));
      handleReset();
      setOpenLogin(false);
    } else {
      setLoading(false);
      toast({
        title: (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CircleAlert />
            {data.message}
          </div>
        ),
        variant: "destructive",
      });
    }
  };
  function handleReset() {
    form.reset();
  }
  return (
    <Dialog
      open={openLogin}
      onOpenChange={() => {
        handleReset();
        setOpenLogin();
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className={isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"}
      >
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="abc@example.com"
                      {...field}
                      className={`bg-transparent ${
                        isDark ? "text-zinc-50 " : "text-zinc-950"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    Password
                    <span
                      className={`cursor-pointer ${
                        isDark ? "text-zinc-50" : "text-zinc-950"
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className={`bg-transparent ${
                        isDark ? "text-zinc-50 " : "text-zinc-950"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              className={`${
                isDark && "bg-white text-zinc-950 hover:bg-zinc-300"
              } `}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <p className="text-center text-sm lg:hidden">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  handleReset();
                  setOpenLogin(false);
                  setOpenSignup(true);
                }}
              >
                Signup
              </span>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
const signupFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
const Signup = ({
  children,
  openSignup,
  setOpenSignup,
  setOpenLogin,
  isDark,
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (credentials) => {
    setLoading(true);
    const { data } = await axios.post("/api/auth/signup", credentials);
    if (data.success) {
      setLoading(false);
      toast({
        title: (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CircleCheckBig />
            {data.message}
          </div>
        ),
        variant: "success",
      });
      dispatch(setUser(data.user));
      handleReset();
      setOpenSignup(false);
    } else {
      setLoading(false);
      toast({
        title: (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CircleAlert />
            {data.message}
          </div>
        ),
        variant: "destructive",
      });
    }
  };
  function handleReset() {
    form.reset();
  }
  return (
    <Dialog
      open={openSignup}
      onOpenChange={() => {
        handleReset();
        setOpenSignup();
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={isDark ? "bg-zinc-950 text-white" : "bg-white"}>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className={`bg-transparent ${
                        isDark ? "text-zinc-50 " : "text-zinc-950"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="abc@example.com"
                      {...field}
                      className={`bg-transparent ${
                        isDark ? "text-zinc-50 " : "text-zinc-950"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    Password
                    <span
                      className={`cursor-pointer ${
                        isDark ? "text-zinc-50" : "text-zinc-950"
                      }`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className={`bg-transparent ${
                        isDark ? "text-zinc-50 " : "text-zinc-950"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              className={`${
                isDark && "bg-white text-zinc-950 hover:bg-zinc-300"
              } `}
            >
              {loading ? "Loading..." : "Signup"}
            </Button>
            <p className="text-center text-sm lg:hidden">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  handleReset();
                  setOpenSignup(false);
                  setOpenLogin(true);
                }}
              >
                Login
              </span>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// https://www.behance.net/gallery/214187865/Electronics-(E-Commerce)-Landing-Page-Design?tracking_source=search_projects|electronics+ecommerce&l=12

// https://www.behance.net/gallery/208574617/Gadget-E-Commerse-Website?tracking_source=search_projects|electronics+ecommerce&l=5
