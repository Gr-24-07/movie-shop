import prisma from "@/lib/db";
import { currencyFormatter } from "@/lib/formats";

export default async function SalesStatistics() {
    const orderCount = await prisma.order.count();
    const orderTotal = await prisma.order.aggregate({
        _sum: {
            totalAmount: true,
        },
    });

    const totalAmount = Number(
        orderTotal._sum.totalAmount !== null ? orderTotal._sum.totalAmount : 0
    );

    console.log(orderTotal);

    return (
        <div>
            <h1 className="text-3xl font-semibold">Statistics</h1>
            <p>Order Count: {orderCount}</p>
            <p>Total all orders: {currencyFormatter.format(totalAmount)}</p>
            <p>
                Average total:{" "}
                {currencyFormatter.format(totalAmount / orderCount)}
            </p>
        </div>
    );
}
