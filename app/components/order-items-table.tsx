import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/formats";
import { OrderItemWithMovie } from "../user/page";

type OrderItemsTableProps = {
    orderItems: OrderItemWithMovie[];
};

export default function OrderItemsTable({ orderItems }: OrderItemsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderItems.map((items) => {
                    return (
                        <TableRow key={items.id}>
                            <TableCell>{items.movie.title}</TableCell>
                            <TableCell className="text-right">
                                {currencyFormatter.format(
                                    Number(items.priceAtPurchase)
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
    );
}
