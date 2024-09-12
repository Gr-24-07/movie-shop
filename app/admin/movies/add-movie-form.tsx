"use client";

import { addMovie, AddMovieResult } from "@/app/actions/movies";
import FormError from "@/app/components/form-error";
import SubmitButton from "@/app/components/submit-button";
import { useState } from "react";

type AddMovieError = Extract<AddMovieResult, { success: false }>["errors"];

export default function AddMovieForm() {
    const [errors, setErrors] = useState<AddMovieError | undefined>();

    async function handleAction(formData: FormData) {
        const result = await addMovie(formData);

        if (!result.success) {
            setErrors(result.errors);
        } else {
            setErrors(undefined);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <form className="flex flex-col gap-4 w-96" action={handleAction}>
                <h2 className="text-2xl font-bold text-center mb-4">
                    Add Movie
                </h2>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="p-2 rounded-md border border-gray-300"
                        type="text"
                        id="title"
                        placeholder="Movie Title"
                        required
                        name="title"
                    />
                    <FormError errors={errors?.title?._errors}></FormError>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        className="text-lg font-semibold"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="p-2 rounded-md border border-gray-300 resize-none"
                        id="description"
                        placeholder="Movie Description"
                        required
                        name="description"
                    />
                    <FormError
                        errors={errors?.description?._errors}
                    ></FormError>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="p-2 rounded-md border border-gray-300"
                        type="number"
                        id="price"
                        placeholder="Movie Price"
                        required
                        name="price"
                    />
                    <FormError errors={errors?.price?._errors}></FormError>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        className="text-lg font-semibold"
                        htmlFor="releaseDate"
                    >
                        Release Date
                    </label>
                    <input
                        className="p-2 rounded-md border border-gray-300"
                        type="date"
                        id="releaseDate"
                        placeholder="Movie releaseDate"
                        required
                        name="releaseDate"
                    />
                    <FormError
                        errors={errors?.releaseDate?._errors}
                    ></FormError>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold" htmlFor="stock">
                        Stock
                    </label>
                    <input
                        className="p-2 rounded-md border border-gray-300"
                        type="number"
                        id="stock"
                        placeholder="Movie Stock"
                        required
                        name="stock"
                    />
                    <FormError errors={errors?.stock?._errors}></FormError>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold" htmlFor="imageURL">
                        Image URL
                    </label>
                    <input
                        className="p-2 rounded-md border border-gray-300"
                        type="string"
                        id="imageURL"
                        placeholder="Movie imageURL"
                        required
                        name="imageURL"
                    />
                    <FormError errors={errors?.imageURL?._errors}></FormError>
                </div>
                <SubmitButton>Add Movie</SubmitButton>
            </form>
        </div>
    );
}
