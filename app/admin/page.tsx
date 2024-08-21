import prisma from "@/lib/db";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function AdminPage() {
    const users = await prisma.user.findMany();

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl text-center font-semibold">
                Admin Dashboard
            </h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
