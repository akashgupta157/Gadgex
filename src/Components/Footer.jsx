"use client";
import React from "react";
import Image from "next/image";
import x from "../../public/icons/x.svg";
import { useSelector } from "react-redux";
import facebook from "../../public/icons/facebook.svg";
import linkedin from "../../public/icons/linkedin.svg";
import instagram from "../../public/icons/instagram.svg";

export default function Footer() {
  const { isDark } = useSelector((state) => state.theme);
  return (
    <>
      <section className="bg-[#4c4c4d] text-zinc-50 px-3 py-5 md:px-5 md:py-10 lg:px-10 lg:py-14 space-y-5 md:flex md:justify-between md:items-center">
        <div className="space-y-1 md:space-y-3 text-center md:text-left">
          <h1 className="text-lg lg:text-xl">Subscribe for newsletter!</h1>
          <p className="text-xs lg:text-sm text-zinc-300">
            Get e-mail updates about our latest shop and special offers.
          </p>
        </div>
        <form className="flex w-full text-zinc-950 text-sm md:w-auto lg:w-2/5">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="outline-none w-full p-2 rounded-l md:px-3 lg:px-5 lg:py-3"
          />
          <button className="bg-[#FFC501] rounded-r p-2 lg:px-5 lg:py-3">
            Subscribe
          </button>
        </form>
      </section>
      <footer
        className={`px-3 py-5 md:px-5 md:py-10 lg:px-10 lg:py-14 space-y-7 lg:flex lg:gap-36 ${
          isDark ? "bg-zinc-950 text-zinc-50" : "bg-white"
        }`}
      >
        <div className="text-center space-y-5 lg:w-1/3 lg:text-left">
          <div className="relative w-fit mx-auto lg:mx-0">
            <h1 className="logo text-4xl font-bold md:text-5xl cursor-pointer noSelect">
              Gadgex
            </h1>
            <div>
              <p className="w-1/2 h-1 bg-[#FFC501]"></p>
              <p className="w-1/2 h-1 bg-[#38B854] absolute top-1 -right-1"></p>
            </div>
          </div>
          <p className="text-xs md:text-sm ">
            We are dedicated to providing the best electronic gadgets at the
            most affordable prices and outstanding customer service.
          </p>
          <div
            className={`flex w-fit mx-auto lg:mx-0 space-x-5 ${
              isDark && "invert"
            }`}
          >
            <Image
              priority
              src={facebook}
              alt="facebook"
              className="size-5 cursor-pointer"
            />

            <Image
              src={instagram}
              alt="instagram"
              className="size-5 cursor-pointer"
            />
            <Image src={x} alt="x" className="size-5 cursor-pointer" />
            <Image
              src={linkedin}
              alt="linkedin"
              className="size-5 cursor-pointer"
            />
          </div>
          <p className="hidden lg:block text-sm">
            © 2025 Gadgex. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:w-2/3 lg:flex lg:justify-evenly gap-5 md:gap-0 ">
          <div>
            <h1 className="text-lg font-medium mb-2">Products</h1>
            <ul className="grid grid-cols-2 text-sm gap-2">
              <li className="cursor-pointer hover:text-[#38B854]">
                Television
              </li>
              <li className="cursor-pointer hover:text-[#38B854]">
                Smartphones
              </li>
              <li className="cursor-pointer hover:text-[#38B854]">Laptops</li>
              <li className="cursor-pointer hover:text-[#38B854]">Tablets</li>
              <li className="cursor-pointer hover:text-[#38B854]">Watches</li>
              <li className="cursor-pointer hover:text-[#38B854]">Cameras</li>
              <li className="cursor-pointer hover:text-[#38B854]">Speakers</li>
              <li className="cursor-pointer hover:text-[#38B854]">
                Headphones
              </li>
            </ul>
          </div>
          <div className="flex justify-between lg:w-2/3 lg:justify-evenly">
            <div>
              <h1 className="text-lg font-medium mb-2">Information</h1>
              <ul className="text-sm space-y-2">
                <li className="cursor-pointer hover:text-[#38B854]">
                  Product Support
                </li>
                <li className="cursor-pointer hover:text-[#38B854]">
                  Checkout
                </li>
                <li className="cursor-pointer hover:text-[#38B854]">
                  License Policy
                </li>
                <li className="cursor-pointer hover:text-[#38B854]">
                  Affiliate
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-lg font-medium mb-2">Customer Service</h1>
              <ul className="text-sm space-y-2">
                <li className="cursor-pointer hover:text-[#38B854]">
                  Help Center
                </li>
                <li className="cursor-pointer hover:text-[#38B854]">
                  Redeem Voucher
                </li>
                <li className="cursor-pointer hover:text-[#38B854]">
                  Contact Us
                </li>
                <li className="cursor-pointer hover:text-[#38B854]">
                  Policies & Rules
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
