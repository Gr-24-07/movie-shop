import { auth } from "@/auth";
import UserDetails from "./user-details";
import AuthProvider from "./auth-provider";
import prisma from "@/lib/db";
import OrderHistory from "./order-history";
import { Movie, Order, OrderItem } from "@prisma/client";
import UserAddressDisplay from "../components/user-address-display";

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

    const address = await prisma.user.findUnique({
        where: {
            id: user?.id,
        },
        select: {
            country: true,
            city: true,
            address: true,
            zip: true,
        },
    });

    if (!user) {
        return <h1>No user</h1>;
    }

    return (
        <AuthProvider>
            <div className="container space-y-6 max-w-screen-lg">
                <div className="space-y-4 border-2 border-primary  p-4 rounded-lg shadow-md shadow-black">
                    <UserDetails user={user}></UserDetails>
                </div>
                <div className="space-y-4 border-2 border-primary  p-4 rounded-lg shadow-md shadow-black">
                    <h1 className="text-4xl font-semibold text-center">
                        Address
                    </h1>
                    <UserAddressDisplay
                        country={address?.country || ""}
                        address={address?.address || ""}
                        zip={address?.zip || ""}
                        city={address?.city || ""}
                    ></UserAddressDisplay>
                </div>

                <OrderHistory
                    orders={orders as OrderWithItems[]}
                ></OrderHistory>
            </div>
        </AuthProvider>
    );
}
