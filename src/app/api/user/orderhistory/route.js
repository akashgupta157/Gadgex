import user from "@/models/user";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";
import orderHistory from "@/models/orderHistory";

export async function POST(req) {
  try {
    await dbConnect();
    const userId = req.headers.get("userid");
    const { products, totalAmount, address, paymentMethod, razorpayOrderId } =
      await req.json();

    await user.findByIdAndUpdate(userId, { address }, { new: true });

    const newOrder = await orderHistory.create({
      user: userId,
      products,
      totalAmount,
      paymentMethod,
      address,
      razorpayOrderId,
    });

    return NextResponse.json({
      message: "Order placed successfully",
      newOrder,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    await dbConnect();
    const userId = req.headers.get("userid");
    const orders = await orderHistory
      .find({ user: userId })
      .populate("products")
      .sort({ orderedAt: -1 });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
