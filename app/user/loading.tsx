import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function LoadingUser() {
    return (
        <div className="container space-y-6 max-w-screen-lg">
            <div className="space-y-4 border-2 border-primary  p-4 rounded-lg shadow-md shadow-black flex flex-col">
                <h1 className="text-4xl text-center font-semibold">
                    User Details
                </h1>

                <Skeleton className="h-6 w-64"></Skeleton>
                <Skeleton className="h-6 w-56"></Skeleton>
                <Skeleton className="h-6 w-72"></Skeleton>
                <Skeleton className="h-6 w-16 self-end"></Skeleton>
            </div>
            <div className="space-y-4 border-2 border-primary  p-4 rounded-lg shadow-md shadow-black">
                <h1 className="text-4xl font-semibold text-center">Address</h1>
                <Skeleton className="h-6 w-64"></Skeleton>
                <Skeleton className="h-6 w-56"></Skeleton>
                <Skeleton className="h-6 w-72"></Skeleton>
            </div>
            <div className="space-y-4">
                <h1 className="text-4xl text-center font-semibold my-8">
                    Order History
                </h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Id</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead>Order Items</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-6 w-32"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-24"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-16"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-24"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-12"></Skeleton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-6 w-32"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-24"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-16"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-24"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-12"></Skeleton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-6 w-32"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-24"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-16"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-24"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-12"></Skeleton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-6 w-32"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-24"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-16"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-24"></Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-12"></Skeleton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
