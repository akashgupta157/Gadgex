import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "@/utils/ScrollToTop";
export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
