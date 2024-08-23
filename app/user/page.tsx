import { auth } from "@/auth";
import UserDetails from "./user-details";
import AuthProvider from "./auth-provider";
import prisma from "@/lib/db";
import OrderHistory from "./order-history";

export default async function UserPage() {
    const session = await auth();
    const user = session?.user;

    const orders = await prisma.order.findMany({
        include: {
            orderItems: true,
            User: true,
        },
        where: {
            userId: user?.id,
        },
    });

    if (!user) {
        return <h1>No user</h1>;
    }

    return (
        <AuthProvider>
            <div className="container space-y-6 max-w-screen-lg">
                <UserDetails user={user}></UserDetails>

                <OrderHistory orders={orders}></OrderHistory>
            </div>
        </AuthProvider>
    );
}
