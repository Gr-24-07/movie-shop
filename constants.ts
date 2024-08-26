import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const CART_NAME = "__cart";

export const CART_OPTIONS: Partial<ResponseCookie> = {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
};
