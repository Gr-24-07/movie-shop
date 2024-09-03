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
    onRemoveItem: (id: string) => Promise<void>;
    onAdd: (id: string, title: string, price: number) => Promise<void>;
    onSet: (
        id: string,
        title: string,
        price: number,
        quantity: number
    ) => Promise<void>;
};

export default function CartTableItem({
    cartItem,
    onRemove,
    onRemoveItem,
    onAdd,
    onSet,
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
                <form
                    action={async () => {
                        alert("Test");
                        await onSet(
                            cartItem.id,
                            cartItem.title,
                            cartItem.price,
                            quantity
                        );
                    }}
                >
                    <input
                        className="w-8 h-8 text-center text-md [appearance:textfield]"
                        type="text"
                        value={quantity}
                        onKeyDown={(event) => {
                            if (
                                [
                                    "Backspace",
                                    "ArrowLeft",
                                    "ArrowRight",
                                    "Tab",
                                ].includes(event.key)
                            ) {
                                return;
                            }
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        onChange={(event) => {
                            let value = event.target.value;

                            setQuantity(Number(value));
                        }}
                        onBlur={async () => {
                            if (cartItem.quantity === quantity) {
                                return;
                            }
                            await onSet(
                                cartItem.id,
                                cartItem.title,
                                cartItem.price,
                                quantity
                            );
                        }}
                    />
                </form>
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
                {currencyFormatter.format(Number(cartItem.price) * quantity)}
            </TableCell>
            <TableCell>
                <form
                    action={async () => {
                        if (
                            confirm(
                                `Are you sure you want to remove "${cartItem.title}" from the cart?`
                            )
                        ) {
                        }
                        await onRemoveItem(cartItem.id);
                    }}
                >
                    <Button size={"icon"} variant={"outline"}>
                        <Trash></Trash>
                    </Button>
                </form>
            </TableCell>
        </TableRow>
    );
}
