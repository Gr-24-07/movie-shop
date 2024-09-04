"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import updateUser, { UpdateUserFail } from "../actions/user";
import { useSession } from "next-auth/react";
import FormError from "../components/form-error";

export default function UserDetails({ user }: { user: User }) {
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState<UpdateUserFail["errors"]>();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const { data: session, update } = useSession();

    async function handleAction(formData: FormData) {
        if (session === null) {
            return;
        }

        const result = await updateUser(formData);

        if (result === undefined) {
            alert("Not authorized");
            return;
        }

        if (!result.success) {
            setErrors(result.errors);
        } else {
            setIsEdit(false);
            await update({
                ...session,
                user: {
                    ...session.user,
                    name: result.data.name,
                    email: result.data.email,
                },
            });
        }
    }

    function reset() {
        setIsEdit(false);
        setEmail(user.email);
        setName(user.name);
    }

    return (
        <>
            <h1 className="text-4xl text-center font-semibold">User Details</h1>
            <div className="flex gap-4">
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
                            className="space-y-2 w-full flex justify-between gap-2"
                        >
                            <div className="flex-grow">
                                <input
                                    type="hidden"
                                    name="prevEmail"
                                    value={user.email || ""}
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
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        value={name || ""}
                                    ></Input>
                                    <FormError
                                        errors={errors?.name?._errors}
                                    ></FormError>
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
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        value={email || ""}
                                    ></Input>
                                    <FormError
                                        errors={errors?.email?._errors}
                                    ></FormError>
                                </div>
                            </div>
                            <Button
                                onClick={reset}
                                variant="destructive"
                                className="w-16 self-end"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="w-16 self-end">
                                Save
                            </Button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <p>Name: {name}</p>
                            <p>Email: {email}</p>
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
