import { NextResponse } from "next/server";
import Product from "@/models/product";
import dbConnect from "@/utils/db";

export const GET = async (req, { params }) => {
  try {
    await dbConnect();
    const { category } = await params;
    const brands = await Product.distinct("brand", { category });
    return NextResponse.json({ brands });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
