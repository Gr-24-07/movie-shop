"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { currencyFormatter } from "@/lib/formats";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { OrderWithItems } from "./page";

export default function OrderHistoryRow({ order }: { order: OrderWithItems }) {
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
                <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">
                                        Price
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Quantity
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.orderItems.map((items) => {
                                    return (
                                        <TableRow key={items.id}>
                                            <TableCell>
                                                {items.movie.title}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {currencyFormatter.format(
                                                    Number(
                                                        items.priceAtPurchase
                                                    )
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {items.quantity}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}
