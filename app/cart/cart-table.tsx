import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    addToCart,
    getCart,
    removeFromCart,
    removeItemFromCart,
    setToCart,
} from "../actions/cart";
import CartTableItem from "./cart-table-item";
import { Decimal } from "@prisma/client/runtime/library";
import { currencyFormatter } from "@/lib/formats";

async function handleRemove(id: string) {
    "use server";

    removeFromCart({
        id: id,
    });
}

async function handleRemoveItem(id: string) {
    "use server";

    removeItemFromCart({
        id: id,
    });
}
async function handleAdd(id: string, title: string, price: Decimal) {
    "use server";

    addToCart({
        id: id,
        title: title,
        price: price,
    });
}

async function handleSet(
    id: string,
    title: string,
    price: Decimal,
    quantity: number
) {
    "use server";

    setToCart({
        id: id,
        title: title,
        price: price,
        quantity: quantity,
    });
}

export default async function CartTable() {
    const cart = await getCart();

    return (
        <div>
            <Table className="lg:table-fixed mb-2">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(cart).map((cartItem) => {
                        return (
                            <CartTableItem
                                onRemove={handleRemove}
                                onRemoveItem={handleRemoveItem}
                                onAdd={handleAdd}
                                onSet={handleSet}
                                key={cartItem[0]}
                                cartItem={cartItem[1]}
                            ></CartTableItem>
                        );
                    })}
                </TableBody>
            </Table>
            <p className="text-right font-semibold">
                Total:{" "}
                {currencyFormatter.format(
                    Object.entries(cart).reduce((total, cartItem) => {
                        return (
                            total +
                            Number(cartItem[1].price) * cartItem[1].quantity
                        );
                    }, 0)
                )}
            </p>
        </div>
    );
}
