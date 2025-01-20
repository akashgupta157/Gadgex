import dbConnect from "@/utils/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();

    // Parse the search query from the request URL
    const searchParams = new URL(req.url).searchParams;
    const query = searchParams.get("query")?.toLowerCase() || "";

    // Define categories and brands for matching
    const categories = [
      "mobile", "television", "laptop", "headphone", "washing_machines",
      "air_conditioner", "air_purifier", "refrigerator", "tablet", "watch",
    ];

    const brands = [
      "Apple", "Samsung", "Xiaomi", "OnePlus", "Oppo", "Vivo", "Realme",
      "Motorola", "LG", "Nokia", "Sony", "Toshiba", "MI", "Asus", "Lenovo",
      "Huawei", "HP", "Google", "Dell", "Redmi", "Honor", "Acer", "Haier",
      "Whirlpool",
    ];

    // Parse price range if mentioned in the query
    const priceRegex = /under (\d+)/;
    const priceMatch = query.match(priceRegex);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : null;

    // Check for matching categories and brands in the query
    const matchedCategories = categories.filter((category) =>
      query.includes(category)
    );
    const matchedBrands = brands.filter((brand) => query.includes(brand.toLowerCase()));

    // Build the MongoDB query dynamically
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

    // Fallback to search across name and description if no category/brand match
    if (dbQuery.$and.length === 0) {
      dbQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    // Fetch the products from the database
    const products = await Product.find(dbQuery);

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error in product search:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
