import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/formats";
import Image from "next/image";
import { SerializedOrderItemWithMovie } from "../actions/order";

type OrderItemsTableProps = {
    orderItems: SerializedOrderItemWithMovie[];
};

export default function OrderItemsTable({ orderItems }: OrderItemsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderItems.map((items) => {
                    return (
                        <TableRow key={items.id}>
                            <TableCell>{items.movie.title}</TableCell>
                            <TableCell>
                                <div className="relative aspect-[9/16] w-16">
                                    <Image
                                        src={items.movie.imageURL || ""}
                                        alt=""
                                        fill
                                        sizes="140px"
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                {currencyFormatter.format(
                                    Number(items.priceAtPurchase)
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                {items.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                                {currencyFormatter.format(
                                    items.quantity *
                                        Number(items.priceAtPurchase)
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
