"use client";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { User } from "@prisma/client";
import UserTableRow from "./user-table-row";

export default function UserTable({ users }: { users: User[] }) {
    return (
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
                        <UserTableRow key={user.id} user={user}></UserTableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
