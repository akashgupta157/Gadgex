import * as jose from "jose";
import { NextResponse } from "next/server";
export async function middleware(req) {
  console.log("Middleware called");
  try {
    const token = req.headers.get("authorization").split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token not found" });
    }
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("userId", payload.userId);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

export const config = {
  matcher: ["/api/user"],
};
