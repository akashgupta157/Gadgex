import dbConnect from "@/utils/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 10; // Default to 10 products
    const pipeline = [
      {
        $match: {
          discount: { $gte: 20 },
        },
      },
      {
        $addFields: {
          discountedPrice: {
            $subtract: [
              "$price",
              { $multiply: ["$price", { $divide: ["$discount", 100] }] },
            ],
          },
        },
      },
      { $sort: { discount: -1, createdAt: -1 } },
      { $limit: limit },
    ];
    const weekDeals = await Product.aggregate(pipeline);
    return NextResponse.json({
      products: weekDeals,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
