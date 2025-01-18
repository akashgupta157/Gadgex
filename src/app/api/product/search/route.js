import dbConnect from "@/utils/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    const categories = [
      "mobile",
      "television",
      "laptop",
      "headphone",
      "washing_machines",
      "air_conditioner",
      "air_purifier",
      "refrigerator",
      "tablet",
      "watch",
    ];

    const brands = [
      "Apple",
      "Samsung",
      "Xiaomi",
      "OnePlus",
      "Oppo",
      "Vivo",
      "Realme",
      "Motorola",
      "LG",
      "Nokia",
      "Sony",
      "Toshiba",
      "MI",
      "Asus",
      "Lenovo",
      "Huawei",
      "HP",
      "Google",
      "Dell",
      "Redmi",
      "Honor",
      "Acer",
      "Haier",
      "Whirlpool",
    ];
    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
