"use client";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheckBig, Eye, EyeOff } from "lucide-react";
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
} from "@/components/ui/form";

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
export const Signup = ({
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
                      {showPassword ? <EyeOff /> : <Eye />}
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
              {loading ? "Loading..." : "Sign up"}
            </Button>
            <p className="lg:hidden text-sm text-center">
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
