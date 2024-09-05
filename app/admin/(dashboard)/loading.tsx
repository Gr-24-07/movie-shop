import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

export default function AdminDashboardSkeleton() {
    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl text-center font-semibold">
                Admin Dashboard
            </h1>

            <div className="space-y-1">
                <h1 className="text-3xl font-semibold">Statistics</h1>
                <Skeleton className="h-6 w-64"></Skeleton>
                <Skeleton className="h-6 w-56"></Skeleton>
                <Skeleton className="h-6 w-72"></Skeleton>
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl font-semibold">Users</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Edit</TableHead>
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
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
