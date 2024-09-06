import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

export default function LoadingCheckout() {
    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">Checkout</h1>
            <h1 className="text-2xl font-semibold text-center">Cart</h1>
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
                    <TableRow>
                        <TableCell>
                            <Skeleton className="h-6 w-32"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-24"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-16"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-24"></Skeleton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Skeleton className="h-6 w-32"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-24"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-16"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-24"></Skeleton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Skeleton className="h-6 w-32"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-24"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-16"></Skeleton>
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton className="h-6 w-24"></Skeleton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="flex flex-col justify-evenly gap-2 sm:flex-row">
                <div className="flex flex-col items-center border-2 p-4 sm:w-1/2">
                    <Skeleton className="w-full h-80"></Skeleton>
                </div>
                <div className="flex flex-col items-center border-2 p-4 sm:w-1/2 relative">
                    <Skeleton className="w-full h-80"></Skeleton>
                </div>
            </div>
        </div>
    );
}
