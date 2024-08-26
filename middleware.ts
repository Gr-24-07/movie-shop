// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
import { CART_NAME, CART_OPTIONS } from "./constants";

// export const { auth: middleware } = NextAuth(authConfig);

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const cart = request.cookies.get(CART_NAME);

    if (cart === undefined) {
        response.cookies.set(CART_NAME, JSON.stringify({}), CART_OPTIONS);
    }

    return response;
}
