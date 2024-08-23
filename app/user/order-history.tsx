import { Order } from "@prisma/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import OrderHistoryRow from "./order-history-row";
import { OrderWithItems } from "./page";

export default function OrderHistory({ orders }: { orders: OrderWithItems[] }) {
    orders.map((order) => {
        console.log(order);
    });

    return (
        <div className="space-y-4">
            <h1 className="text-4xl text-center font-semibold my-8">
                Order History
            </h1>

            <Table>
                <TableCaption>A list of all your orders</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Order Items</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => {
                        return (
                            <OrderHistoryRow
                                key={order.id}
                                order={order}
                            ></OrderHistoryRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
