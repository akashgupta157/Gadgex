import User from "@/models/user";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await dbConnect();
    const userId = req.headers.get("userid");
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 }
      );
    }
    await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    ).populate("cart");
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
