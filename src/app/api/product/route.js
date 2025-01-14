import Product from "@/models/product";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();
    const newProduct = await Product.create(await req.json());
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const brands = searchParams.getAll("brand");
    const ratings = searchParams.getAll("rating").map(Number);
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minDiscount = searchParams.get("minDiscount");
    const maxDiscount = searchParams.get("maxDiscount");
    const sort = searchParams.get("sort");
    const limit = Number(searchParams.get("limit"));
    const matchQuery = {};
    if (category) {
      matchQuery.category = category;
    }
    if (brands.length > 0) {
      matchQuery.brand = { $in: brands };
    }
    if (ratings.length > 0) {
      matchQuery.rating = { $in: ratings };
    }
    if (minDiscount || maxDiscount) {
      matchQuery.discount = {};
      if (minDiscount) matchQuery.discount.$gte = Number(minDiscount);
      if (maxDiscount) matchQuery.discount.$lte = Number(maxDiscount);
    }
    const pipeline = [
      { $match: matchQuery },
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
    ];
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      pipeline.push({ $match: { discountedPrice: priceFilter } });
    }
    let sortOption = {};
    switch (sort) {
      case "htl":
        sortOption = { discountedPrice: -1 };
        break;
      case "lth":
        sortOption = { discountedPrice: 1 };
        break;
      case "relevance":
      default:
        sortOption = { createdAt: -1 };
        break;
    }
    pipeline.push({ $sort: sortOption });
    if (limit) pipeline.push({ $limit: limit });
    const products = await Product.aggregate(pipeline);
    const total = await Product.countDocuments(matchQuery);
    return NextResponse.json({
      products,
      total,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
