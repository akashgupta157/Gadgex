"use client";
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/slices/userSlice";
import { signIn, useSession } from "next-auth/react";
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
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(setUser(session.user));

      toast({
        title: (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CircleCheckBig />
            "Logged in successfully"
          </div>
        ),
        variant: "success",
      });

      setOpenLogin(false);
    }
  }, [status, session, dispatch, setOpenLogin, toast]);

  const handleGoogleSignup = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CircleAlert />
            "Failed to sign in with Google"
          </div>
        ),
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
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
          </form>
        </Form>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignup}
          disabled={isGoogleLoading}
        >
          <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {loading ? "Loading..." : "Sign up with Google"}
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
      </DialogContent>
    </Dialog>
  );
};
