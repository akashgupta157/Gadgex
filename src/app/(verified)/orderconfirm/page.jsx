"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import verified from "../../../../public/verified.gif";
import { redirect, useSearchParams } from "next/navigation";

export default function OrderConfirm() {
  const searchParams = useSearchParams();
  const { isDark } = useSelector((state) => state.theme);
  useEffect(() => {
    setTimeout(() => {
      redirect("/");
    }, 5000);
  }, []);
  if (!searchParams?.get("id")) redirect("/");
  return (
    <div
      className={`px-3 md:px-5 lg:px-10 py-10 ${
        isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center justify-center h-[50svh] gap-5 ">
        <Image src={verified} alt="banner" className="w-52" />
        <h1 className="text-2xl font-semibold">Thank you for your order</h1>
        <p className="text-sm text-zinc-500">
          Your order has been placed successfully
        </p>
        <p>Confirmation number: {searchParams?.get("id")}</p>
      </div>
    </div>
  );
}
