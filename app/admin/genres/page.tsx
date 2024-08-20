"use client";

import React, { useRef, useState } from "react";
import { AddGenreAction, AddGenreFailure } from "./action";
import AddButton from "@/app/components/genre-addbutton";
import FormError from "@/app/components/form-error";

export default function AddGenrePage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<
        AddGenreFailure["errors"] | undefined
    >();

    async function action(formData: FormData) {
        const result = await AddGenreAction(formData);

        if (result.success) {
            formRef.current?.reset();
            setErrors(undefined);
            return;
        } else {
            setErrors(result.errors);
        }
    }

    return (
        <main className="container mx-auto my-12">
            <div className=" bg-blue-500 p-4 rounded-lg font-bold">
                <h1 className="text-center">Movie Genre</h1>
            </div>

            <form className=" p-6  mt-6 space-y-6" action={action}>
                <div className="flex flex-col">
                    <label
                        htmlFor="title"
                        className="text-gray-700 font-medium mb-2"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <FormError errors={errors?.name?._errors} />
                </div>

                <AddButton />
            </form>
        </main>
    );
}
