import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user";
import dbConnect from "@/utils/db";
import jwt from "jsonwebtoken";
export async function POST(req) {
  await dbConnect();
  try {
    const { name, email, password } = await req.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: newUser._doc._id },
      process.env.JWT_SECRET
    );
    return NextResponse.json({
      message: "User created successfully",
      user: { ...newUser._doc, token },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
