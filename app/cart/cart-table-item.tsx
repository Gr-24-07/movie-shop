"use client";

import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { currencyFormatter } from "@/lib/formats";
import { Minus, Plus, Trash } from "lucide-react";
import { CartItem } from "../actions/cart";
import { useState } from "react";
import { Decimal } from "@prisma/client/runtime/library";

type CartTableItemProps = {
    cartItem: CartItem;
    onRemove: (id: string) => Promise<void>;
    onAdd: (id: string, title: string, price: Decimal) => Promise<void>;
};

export default function CartTableItem({
    cartItem,
    onRemove,
    onAdd,
}: CartTableItemProps) {
    const [quantity, setQuantity] = useState(cartItem.quantity);

    return (
        <TableRow>
            <TableCell>{cartItem.title}</TableCell>
            <TableCell className="text-right">
                {currencyFormatter.format(Number(cartItem.price))}
            </TableCell>
            <TableCell className="flex justify-end items-center gap-1">
                <form
                    action={async () => {
                        await onRemove(cartItem.id);
                        setQuantity((prevQuantity) => {
                            return prevQuantity - 1;
                        });
                    }}
                >
                    <Button size={"icon"} variant={"outline"}>
                        <Minus />
                    </Button>
                </form>
                <input
                    className="w-8 h-8 text-center text-md [appearance:textfield]"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <form
                    action={async () => {
                        await onAdd(
                            cartItem.id,
                            cartItem.title,
                            cartItem.price
                        );
                        setQuantity((prevQuantity) => {
                            return prevQuantity + 1;
                        });
                    }}
                >
                    <Button size={"icon"} variant={"outline"}>
                        <Plus />
                    </Button>
                </form>
            </TableCell>
            <TableCell className="text-right">
                {currencyFormatter.format(
                    Number(cartItem.price) * cartItem.quantity
                )}
            </TableCell>
            <TableCell>
                <Button size={"icon"} variant={"outline"}>
                    <Trash></Trash>
                </Button>
            </TableCell>
        </TableRow>
    );
}
