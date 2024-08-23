import { auth } from "@/auth";
import UserDetails from "./user-details";
import AuthProvider from "./auth-provider";
import prisma from "@/lib/db";
import OrderHistory from "./order-history";
import { Movie, Order, OrderItem } from "@prisma/client";

export type OrderItemWithMovie = OrderItem & {
    movie: Movie;
};

export type OrderWithItems = Order & {
    orderItems: OrderItemWithMovie[];
};

export default async function UserPage() {
    const session = await auth();
    const user = session?.user;

    const orders = (await prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    movie: true,
                },
            },
            User: true,
        },
        where: {
            userId: user?.id,
        },
    })) as OrderWithItems[];

    if (!user) {
        return <h1>No user</h1>;
    }

    return (
        <AuthProvider>
            <div className="container space-y-6 max-w-screen-lg">
                <UserDetails user={user}></UserDetails>

                <OrderHistory
                    orders={orders as OrderWithItems[]}
                ></OrderHistory>
            </div>
        </AuthProvider>
    );
}
