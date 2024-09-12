"use client";

import { updateMovie } from "@/app/actions/movies";
import { Movie } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useState } from "react";
import { AddMovieError } from "./add-movie-form";
import FormError from "@/app/components/form-error";

export default function UpdateMovieForm({ movie }: { movie: Movie }) {
    const [errors, setErrors] = useState<AddMovieError | undefined>();

    async function handleAction(formData: FormData) {
        const result = await updateMovie(formData, movie.id);

        if (!result.success) {
            setErrors(result.errors);
        } else {
            setErrors(undefined);
            redirect("/admin/movies");
        }
    }
    return (
        <form className="flex flex-col gap-4 w-96" action={handleAction}>
            <h2 className="text-2xl font-bold text-center mb-4">
                Update Movie
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
                    defaultValue={movie?.title}
                    required
                    name="title"
                />
                <FormError errors={errors?.title?._errors}></FormError>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="p-2 rounded-md border border-gray-300 resize-none"
                    id="description"
                    placeholder="Movie Description"
                    defaultValue={movie?.description || ""}
                    required
                    name="description"
                />
                <FormError errors={errors?.description?._errors}></FormError>
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
                    defaultValue={Number(movie?.price)}
                    required
                    name="price"
                />
                <FormError errors={errors?.price?._errors}></FormError>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="releaseDate">
                    Release Date
                </label>
                <input
                    className="p-2 rounded-md border border-gray-300"
                    type="date"
                    id="releaseDate"
                    placeholder="Movie releaseDate"
                    defaultValue={
                        movie?.releaseDate.toISOString().split("T")[0]
                    }
                    required
                    name="releaseDate"
                />
                <FormError errors={errors?.releaseDate?._errors}></FormError>
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
                    defaultValue={movie?.stock}
                    required
                    name="stock"
                />
                <FormError errors={errors?.stock?._errors}></FormError>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="URL">
                    Image URL
                </label>
                <input
                    className="p-2 rounded-md border border-gray-300"
                    type="text"
                    id="imageURL"
                    placeholder="Movie imageURL"
                    defaultValue={movie?.imageURL || ""}
                    required
                    name="imageURL"
                />
                <FormError errors={errors?.imageURL?._errors}></FormError>
            </div>
            <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-lg"
            >
                Update Movie
            </button>
        </form>
    );
}
