import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { addToCart, getCart, removeFromCart } from "../actions/cart";
import CartTableItem from "./cart-table-item";
import { Decimal } from "@prisma/client/runtime/library";

async function handleRemove(id: string) {
    "use server";
    console.log("Removing...");

    removeFromCart({
        id: id,
    });
}
async function handleAdd(id: string, title: string, price: Decimal) {
    "use server";
    console.log("Removing...");

    addToCart({
        id: id,
        title: title,
        price: price,
    });
}

export default async function CartTable() {
    const cart = await getCart();

    return (
        <div>
            <h1 className="text-4xl font-semibold text-center">Cart</h1>

            <Table>
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
                                onAdd={handleAdd}
                                key={cartItem[0]}
                                cartItem={cartItem[1]}
                            ></CartTableItem>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
