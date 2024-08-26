import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import UserTableRow from "./user-table-row";
import prisma from "@/lib/db";

export default async function UserTable() {
    const users = await prisma.user.findMany();
    return (
        <>
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
                    {users.map((user) => {
                        return (
                            <UserTableRow
                                key={user.id}
                                user={user}
                            ></UserTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
