"use server";

import prisma from "@/lib/db";
import { Cart } from "./cart";
import { Order } from "@prisma/client";

export type OrderSuccess = { success: true; order: Order };
export type OrderFail = { success: false; error: string };

export type OrderResult = OrderSuccess | OrderFail;

export async function sendOrder(
    userId: string,
    cart: Cart
): Promise<OrderResult> {
    const cartArr = Object.values(cart);

    if (cartArr.length === 0) {
        return { success: false, error: "Cart is empty" };
    }

    const total = Object.entries(cart).reduce((total, cartItem) => {
        return total + Number(cartItem[1].price) * cartItem[1].quantity;
    }, 0);

    const orderItemsData = cartArr.map((cartItem) => ({
        movieId: cartItem.id,
        quantity: cartItem.quantity,
        priceAtPurchase: cartItem.price,
    }));

    const res = await prisma.order.create({
        data: {
            status: "Pending",
            totalAmount: total,
            orderItems: {
                createMany: {
                    data: orderItemsData,
                },
            },
            User: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    return { success: true, order: res };
}
