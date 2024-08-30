import OrderItemsTable from "@/app/components/order-items-table";
import UserAddressDisplay from "@/app/components/user-address-display";
import prisma from "@/lib/db";
import { currencyFormatter } from "@/lib/formats";
import { notFound } from "next/navigation";

type OrderConfirmationType = {
    params: {
        orderId: string;
    };
};

export default async function OrderConfirmation({
    params,
}: OrderConfirmationType) {
    const orderId = params.orderId;
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            orderItems: {
                include: {
                    movie: true,
                },
            },
        },
    });

    const address = await prisma.user.findUnique({
        where: {
            id: order?.userId,
        },
        select: {
            country: true,
            city: true,
            address: true,
            zip: true,
        },
    });

    if (!order) {
        return notFound();
    }

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">
                Order Confirmation
            </h1>
            <p className="font-semibold text-xl text-center">
                Thank you for your order!
            </p>
            <div>
                <p>
                    <span className="font-semibold">Order number: </span>
                    {orderId}
                </p>
                <p>
                    <span className="font-semibold">Order date: </span>
                    {order?.orderDate.toLocaleDateString()}
                </p>
                <p>
                    <span className="font-semibold">Total: </span>
                    {currencyFormatter.format(Number(order?.totalAmount))}
                </p>
            </div>
            <OrderItemsTable orderItems={order?.orderItems}></OrderItemsTable>
            <div>
                <h1 className="font-semibold text-lg">Delivering to:</h1>
                <UserAddressDisplay
                    country={address?.country || ""}
                    city={address?.city || ""}
                    zip={address?.zip || ""}
                    address={address?.address || ""}
                ></UserAddressDisplay>
            </div>

            <p>
                <span className="font-semibold">Need Help? </span>
                Contact our customer support at{" "}
                <a
                    className="text-blue-500 underline hover:text-blue-700"
                    href="mailto:support@fakemoviestore.com"
                >
                    support@fakemoviestore.com
                </a>
            </p>
        </div>
    );
}
