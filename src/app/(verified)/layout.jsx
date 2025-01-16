"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
export default function Layout({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  if (!isAuthenticated) {
    redirect("/");
  }
  return <div>{children}</div>;
}
