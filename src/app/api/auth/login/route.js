import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        message: "Incorrect password",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    const userWithoutPassword = {
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address,
    };
    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
