import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getCart } from "../actions/cart";
import { currencyFormatter } from "@/lib/formats";

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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(cart).map((cartItem) => {
                        return (
                            <TableRow key={cartItem[0]}>
                                <TableCell>{cartItem[1].title}</TableCell>
                                <TableCell className="text-right">
                                    {currencyFormatter.format(
                                        Number(cartItem[1].price)
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    {cartItem[1].quantity}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
