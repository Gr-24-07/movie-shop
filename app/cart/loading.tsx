import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import MovieCardSkeleton from "../components/movie-card-skeleton";

export default function CartSkeleton() {
    return (
        <div className="container space-y-6 max-w-screen-lg">
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
                            <Skeleton className="h-6 w-24"></Skeleton>
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
                            <Skeleton className="h-6 w-24"></Skeleton>
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
                            <Skeleton className="h-6 w-24"></Skeleton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/* <Button size={"lg"} asChild>
                <Link href="/checkout">Checkout</Link>
            </Button> */}
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-center">
                    You might also like:
                </h1>
                <div className="flex gap-4 justify-center">
                    <MovieCardSkeleton></MovieCardSkeleton>
                    <MovieCardSkeleton></MovieCardSkeleton>
                    <MovieCardSkeleton></MovieCardSkeleton>
                    <MovieCardSkeleton></MovieCardSkeleton>
                </div>
            </div>
        </div>
    );
}
