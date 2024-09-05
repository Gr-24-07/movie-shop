"use client";

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
import { adminUpdateUser, AdminUpdateUserFail } from "../../actions/user";
import FormError from "../../components/form-error";

export default function UserTableRow({ user }: { user: User }) {
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [role, setRole] = useState(user.role);
    const [errors, setErrors] = useState<
        AdminUpdateUserFail["errors"] | null
    >();

    async function handleAction() {
        const newName = name === user.name ? undefined : name;
        const newEmail = email === user.email ? undefined : email;
        const newRole = role === user.role ? undefined : role;

        const result = await adminUpdateUser(
            user.id,
            newName,
            newEmail,
            newRole
        );

        if (!result?.success) {
            setErrors(result.errors);
        } else {
            setIsEdit(false);
        }
    }

    function reset() {
        setName(user.name || "");
        setEmail(user.email || "");
        setRole(user.role);
        setErrors(null);
        setIsEdit(false);
    }

    return (
        <>
            {isEdit ? (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">
                        <Input
                            className="w-full min-w-32"
                            type="text"
                            name="name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            value={name}
                        />
                        <FormError errors={errors?.name?._errors}></FormError>
                    </TableCell>
                    <TableCell>
                        <Input
                            className="w-full min-w-40"
                            type="text"
                            name="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                        />
                        <FormError errors={errors?.email?._errors}></FormError>
                    </TableCell>
                    <TableCell>
                        <Select
                            name="role"
                            value={role}
                            onValueChange={(value) => {
                                setRole(value as Role);
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
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
                        <FormError errors={errors?.role?._errors}></FormError>
                    </TableCell>
                    <TableCell>
                        <form
                            className="flex gap-2"
                            action={async () => {
                                await handleAction();
                            }}
                        >
                            <button className="text-green-800 animate-pulse border p-1 border-green-800 hover:bg-green-200">
                                <Check />
                            </button>
                            <button
                                onClick={() => {
                                    reset();
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
