"use client"; 

import { createGenre, getGenres } from "@/app/actions/genres";  
import { useState, useEffect } from "react";
import { z } from "zod";

// Validating genre input
const genreSchema = z.object({
    name: z.string().min(1, "Enter the genre ").toLowerCase(),
});

export default function Input() {
    const [genre, setGenre] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [existingGenres, setExistingGenres] = useState<string[]>([]);  

    // Fetch existing genres on component mount
    useEffect(() => {
        async function loadGenres() {
            try {
                const genres = await getGenres();  
                setExistingGenres(genres.map((g: any) => g.name.toLowerCase())); 
            } catch (error) {
                console.error("Failed to fetch genres", error);
            }
        }

        loadGenres();
    }, []);

    async function handleSubmit() {
        setError(null);

        const validation = genreSchema.safeParse({ name: genre.trim() });

        if (!validation.success) {
            setError(validation.error.errors[0]?.message);
            return;
        }

        const genreName = validation.data.name;

        // Check if genre already exists
        if (existingGenres.includes(genreName)) {
            setError("Genre already added.");
            return;
        }

        setIsPending(true);

        // Create a new genre
        try {
            await createGenre(genreName);
            
            setSuccessMessage("Genre added successfully!");
            setGenre("");  

            // Update the list of existing genres after adding the new genre
            setExistingGenres([...existingGenres, genreName]);
        } catch (error) {
            setError("An error occurred while adding the genre.");
        } finally {
            setIsPending(false);
        }

        setTimeout(() => {
            setSuccessMessage(null);
        }, 2000);
        // Refresh the page after the delay
        window.location.reload();
    }

    return (
        <form
            className="p-6 space-y-3 bg-gray-50 rounded-lg shadow-inner flex flex-col"
            onSubmit={(ev) => {
                ev.preventDefault();
                handleSubmit();
            }}
        >
            <label className="text-md  text-black">Genre</label>
            <input
                className={`w-full border p-2 rounded focus:outline-none focus:border-blue-400 ${
                    error ? "border-red-500" : "border-gray-400"
                }`}
                type="text"
                placeholder="Enter your Genre..."
                value={genre}
                onChange={(ev) => setGenre(ev.target.value)}
                disabled={isPending}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-black text-white rounded-lg px-4 py-2 disabled:opacity-50 hover:bg-gray-700"
                    disabled={isPending}
                >
                    {isPending ? "Adding..." : "Add"}
                </button>
            </div>
            {successMessage && (
                <div className="text-green-600">
                    {successMessage}
                </div>
            )}
        </form>
    );
}
