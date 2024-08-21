import { Role, User } from "@prisma/client";

import { TableCell, TableRow } from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function UserTableRow({ user }: { user: User }) {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            {isEdit ? (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">
                        {" "}
                        <Input
                            className="w-full"
                            type="text"
                            name="name"
                            defaultValue={user.name || ""}
                        />
                    </TableCell>
                    <TableCell>
                        <Input
                            className="w-full"
                            type="text"
                            name="name"
                            defaultValue={user.email || ""}
                        />
                    </TableCell>
                    <TableCell>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={user.role} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={Role.ADMIN}>
                                    {Role.ADMIN}
                                </SelectItem>
                                <SelectItem value={Role.USER}>
                                    {Role.USER}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <form className="flex gap-2">
                            <button className="text-green-800 animate-pulse border p-1 border-green-800 hover:bg-green-200">
                                <Check />
                            </button>
                            <button
                                onClick={() => {
                                    setIsEdit(false);
                                }}
                                className="text-red-800 animate-pulse border p-1 border-red-800 hover:bg-red-200"
                            >
                                <X />
                            </button>
                        </form>
                    </TableCell>
                </TableRow>
            ) : (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                        <button
                            onClick={() => setIsEdit(true)}
                            className="text-blue-800 animate-pulse border p-1 border-blue-800 hover:bg-blue-200"
                        >
                            <Pencil />
                        </button>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}
