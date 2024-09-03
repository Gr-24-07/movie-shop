import { SerializedMovie } from "@/app/actions/movies";
import { SerializedOrder, SerializedOrderWithItems } from "@/app/actions/order";
import { OrderWithItems } from "@/app/user/page";
import { Movie, Order, OrderItem } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function serializeMovie(movie: Movie): SerializedMovie {
    return {
        ...movie,
        price: movie.price.toString(),
    };
}

export function serializeOrder(
    order: OrderWithItems | Order
): SerializedOrderWithItems | SerializedOrder {
    if ("orderItems" in order) {
        return {
            ...order,
            totalAmount: order.totalAmount.toString(),
            orderItems: order.orderItems.map((item) => ({
                ...item,
                priceAtPurchase: item.priceAtPurchase.toString(),
                movie: {
                    ...item.movie,
                    price: item.movie.price.toString(),
                },
            })),
        };
    } else {
        return {
            ...order,
            totalAmount: order.totalAmount.toString(),
        };
    }
}
