import { Order } from "@prisma/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

export default function OrderHistory({ orders }: { orders: Order[] }) {
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
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Show Items</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => {
                        return (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">
                                    {order.id}
                                </TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    {order.orderDate.toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {order.totalAmount.toString()}
                                </TableCell>
                                <TableCell className="flex gap-2 hover:cursor-pointer">
                                    Show <ChevronDown size={20}></ChevronDown>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
