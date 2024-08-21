"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import updateUser from "../actions/user";

export default function UserDetails({ user }: { user: User }) {
    const [isEdit, setIsEdit] = useState(false);

    async function handleAction(formData: FormData) {
        const result = await updateUser(formData);
        setIsEdit(false);
        console.log(result);
    }

    return (
        <>
            <h1 className="text-4xl text-center font-semibold">User Details</h1>

            <div className="flex gap-4 border-2 border-primary  p-4 rounded-lg shadow-md shadow-black">
                <div>
                    <Image
                        src={user.image || ""}
                        alt=""
                        width={60}
                        height={60}
                    ></Image>
                </div>
                {isEdit ? (
                    <>
                        <form
                            action={handleAction}
                            className="space-y-2 w-full flex justify-between"
                        >
                            <div className="flex-grow">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={user.id}
                                />
                                <div>
                                    <Label className="text-base" htmlFor="name">
                                        Name:
                                    </Label>
                                    <Input
                                        className="text-base w-3/5"
                                        type="text"
                                        id="name"
                                        name="name"
                                        defaultValue={user.name || ""}
                                    ></Input>
                                </div>
                                <div>
                                    <Label
                                        className="text-base"
                                        htmlFor="email"
                                    >
                                        Email:
                                    </Label>
                                    <Input
                                        className="text-base w-3/5"
                                        type="text"
                                        id="email"
                                        name="email"
                                        defaultValue={user.email || ""}
                                    ></Input>
                                </div>
                            </div>
                            <Button className="w-16 self-end">Save</Button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                        </div>
                        <Button
                            onClick={() => {
                                setIsEdit(!isEdit);
                            }}
                            className="self-end ml-auto w-16"
                        >
                            Edit
                        </Button>
                    </>
                )}
            </div>
        </>
    );
}
