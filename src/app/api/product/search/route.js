import dbConnect from "@/utils/db";
import { brands } from "@/utils/misc";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();

    const searchParams = new URL(req.url).searchParams;
    const query = searchParams.get("query")?.toLowerCase() || "";

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

    const priceRegex = /under (\d+)/;
    const priceMatch = query.match(priceRegex);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : null;

    const matchedCategories = categories.filter((category) =>
      query.includes(category)
    );
    const matchedBrands = brands.filter((brand) =>
      query.includes(brand.toLowerCase())
    );

    const dbQuery = {
      $and: [],
    };

    if (matchedCategories.length > 0) {
      dbQuery.$and.push({ category: { $in: matchedCategories } });
    }

    if (matchedBrands.length > 0) {
      dbQuery.$and.push({ brand: { $in: matchedBrands } });
    }

    if (maxPrice) {
      dbQuery.$and.push({ price: { $lte: maxPrice } });
    }

    if (dbQuery.$and.length === 0) {
      dbQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    const products = await Product.find(dbQuery);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error in product search:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
