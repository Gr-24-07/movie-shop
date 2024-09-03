"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { currencyFormatter } from "@/lib/formats";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import OrderItemsTable from "../components/order-items-table";
import { SerializedOrderWithItems } from "../actions/order";

export default function OrderHistoryRow({
    order,
}: {
    order: SerializedOrderWithItems;
}) {
    const [showItems, setShowItems] = useState(false);
    return (
        <>
            <TableRow>
                <TableCell>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                                {order.id}
                            </TooltipTrigger>
                            <TooltipContent>{order.id}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                    {order.orderDate.toLocaleDateString("sv")}
                </TableCell>
                <TableCell className="text-right">
                    {currencyFormatter.format(Number(order.totalAmount))}
                </TableCell>
                <TableCell
                    className="flex gap-2 hover:cursor-pointer"
                    onClick={() => {
                        setShowItems(!showItems);
                    }}
                >
                    Show
                    <ChevronDown
                        size={20}
                        className={`transition duration-500 ${
                            showItems && "rotate-180"
                        }`}
                    ></ChevronDown>
                </TableCell>
            </TableRow>
            {showItems && (
                <TableRow className="bg-slate-200">
                    <TableCell colSpan={5}>
                        <OrderItemsTable
                            orderItems={order.orderItems}
                        ></OrderItemsTable>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}
