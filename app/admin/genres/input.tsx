"use client";

import { useState } from "react";
import { createGenre } from "../../actions/genre";

export type InputProps = {};

export default function Input({}: InputProps) {
    const [genre, setGenre] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    async function handleSubmit() {
        const trimmedGenre = genre.trim();

        if (!trimmedGenre) {
            setGenre("");
            alert("Please provide a genre name");
            return;
        }

        await createGenre(trimmedGenre);
        
        setSuccessMessage("Genre added successfully!");
        setGenre("");

        setTimeout(() => {
            setSuccessMessage(null);
        }, 1500);
    }

    return (
        <form
            className="p-6 mt-6 space-y-6 bg-gray-50 rounded-lg shadow-inner flex flex-col"
            onSubmit={(ev) => {
                ev.preventDefault();
                handleSubmit();
            }}
        >
            <input
                className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-400"
                type="text"
                placeholder="Enter your Genre..."
                value={genre}
                onChange={(ev) => setGenre(ev.target.value)}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-black text-white rounded-lg px-4 py-3 disabled:opacity-50 hover:bg-gray-700"
                >
                    Add
                </button>
            </div>
            
            {successMessage && (
                <div className="text-green-600 text-sm">
                    {successMessage}
                </div>
            )}
        </form>
    );
}
