import * as jose from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("userId", payload.userId);
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}

export const config = {
  matcher: [
    "/api/user",
    "/api/user/emptyCart",
    "/api/user/orderhistory",
    "/api/product/ai-chat",
  ],
};
