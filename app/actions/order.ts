"use server";

import prisma from "@/lib/db";
import { Cart } from "./cart";

export async function sendOrder(userId: string, cart: Cart) {
    const total = Object.entries(cart).reduce((total, cartItem) => {
        return total + Number(cartItem[1].price) * cartItem[1].quantity;
    }, 0);

    const cartArr = Object.values(cart);

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

    return res;
}
