"use server";

import prisma from "@/lib/db";
import { Cart } from "./cart";

export async function sendOrder(userId: string, cart: Cart) {
    const total = Object.entries(cart).reduce((total, cartItem) => {
        return total + Number(cartItem[1].price) * cartItem[1].quantity;
    }, 0);

    const cartArr = Object.values(cart);

    await prisma.order.create({
        data: {
            status: "Pending",
            totalAmount: total,
            // orderItems: {
            //     createMany: {
            //         data: {
            //             movieId:
            //         },
            //     },
            // },
            User: {
                connect: {
                    id: userId,
                },
            },
        },
    });
}
