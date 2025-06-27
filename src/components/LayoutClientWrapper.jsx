"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function LayoutClientWrapper({ children, session }) {
  const pathname = usePathname();

  const showNavAndFooter = !pathname.startsWith("/razorpay");

  return (
    <SessionProvider session={session}>
      {showNavAndFooter && <Navbar />}
      {children}
      {showNavAndFooter && <Footer />}
    </SessionProvider>
  );
}
