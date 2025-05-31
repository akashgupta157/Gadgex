import dbConnect from "@/utils/db";
import Chat from "@/models/aiChat";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();
    const userId = req.headers.get("userid");
    const { productId, question } = await req.json();

    if (!productId || !question) {
      return NextResponse.json(
        { error: "Product ID and question are required." },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const prompt = `
  You are an assistant for an electronics e-commerce store. 
  Help the customer by answering their question about the product, including comparisons with similar products when requested.

  First check these PRODUCT DETAILS:
  - Name: ${product.name}
  - Brand: ${product.brand}
  - Price: ₹${Math.ceil(
    product.price - (product.price * product.discount) / 100
  )}
  - Discount: ${product.discount}%
  - MRP: ₹${product.price}
  - Description: ${product.description}
  - Category: ${product.category}
  - Rating: ${product.rating}/5

  CUSTOMER QUESTION: "${question}"

  INSTRUCTIONS:
  1. If the answer is in the product details above, provide a concise answer (under 100 words)
  2. If not, use your general knowledge about this type of product to answer
  3. For technical specifications or comparisons not listed, make reasonable inferences based on the product category and brand reputation
  4. Only say "I'm not sure" if the question is completely unrelated to electronics/products
  5. If the question requests comparison with other products:
     a. Identify 1-2 most comparable products in the same category
     b. Compare key specs like price, features, brand reputation
     c. Highlight this product's advantages/disadvantages
     d. Keep comparison factual and unbiased
  6. For technical questions not in the details, use your product knowledge
  7. If comparing to very different products, explain why comparison might not be appropriate

  Example comparison format:
  "Compared to [Competitor Product]:
   - Similar: [feature A, feature B]
   - Differences: [our product has X but lacks Y]
   - Price: [our product is ₹X vs their ₹Y]
   - Best for: [type of users who should choose each]"

  Always maintain a helpful tone and provide the most accurate information possible.
  Focus specifically on this product (${product.name} by ${product.brand}).
`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    await Chat.findOneAndUpdate(
      {
        product: productId,
        user: userId,
      },
      {
        $push: {
          messages: {
            question,
            answer,
          },
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const product = searchParams.get("productId");
    if (!product) {
      return NextResponse.json(
        { error: "Product ID is required." },
        { status: 400 }
      );
    }
    const chat = await Chat.findOne({ product });
    console.log(chat);
    return NextResponse.json({
      history: chat?.messages.reverse() || [],
    });
  } catch (error) {
    console.error("Fetch History Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
