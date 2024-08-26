"use server";

import { CART_NAME, CART_OPTIONS } from "@/constants";
import { Movie } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type Cart = Record<string, CartItem>;

export type CartItem = Pick<Movie, "id" | "title" | "price"> & {
    quantity: number;
};

export async function getCart() {
    return getCookie();
}

export async function addToCart(item: CartItem) {
    const cart = getCookie();
    const existingItem = cart[item.id];

    if (existingItem) {
        cart[item.id].quantity += item.quantity;
    } else {
        cart[item.id] = item;
    }

    setCookie(cart);

    revalidatePath("/", "layout");
    revalidatePath("/cart");
}

function getCookie(): Cart {
    const cookie = cookies().get(CART_NAME);

    if (cookie === undefined) {
        return {};
    }
    return JSON.parse(cookie.value) ?? {};
}

function setCookie(cart: Cart) {
    cookies().set(CART_NAME, JSON.stringify(cart), CART_OPTIONS);
}

function deleteCookie() {
    setCookie({});
}
