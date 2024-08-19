"use client";

import React, { useState } from "react";
import AddButton from "../components/genre-addbutton";

export default function MovieGenre() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Title:", title);
        console.log("Genre:", genre);
    };

    return (
        <main className="container mx-auto my-12">
            
            <div className=" bg-blue-500 p-4 rounded-lg font-bold">
                <h1 className="text-center">Add a New Movie Genre</h1>
            </div>

            <form className=" p-6  mt-6 space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-gray-700 font-medium mb-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="genre" className="text-gray-700 font-medium mb-2">
                        Genre Name:
                    </label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <AddButton />
            </form>
        </main>
    );
}
