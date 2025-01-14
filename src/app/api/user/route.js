import User from "@/models/user";
import dbConnect from "@/utils/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await dbConnect();
    const userId = req.headers.get("userid");
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const user = await User.findById(userId).populate(type);
    const reversedItems = user[type].reverse();
    return NextResponse.json({ [type]: reversedItems });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
export async function PATCH(req) {
  try {
    await dbConnect();
    const userId = req.headers.get("userid");
    const { type, productId } = await req.json();
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user[type].includes(product._id)) user[type].push(product._id);
    await user.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
export async function DELETE(req) {
  try {
    await dbConnect();
    const userId = req.headers.get("userid");
    const { type, productId } = await req.json();
    console.log(userId, type, productId);
    const user = await User.findById(userId);
    user[type] = user[type].filter((id) => id.toString() !== productId);
    await user.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
