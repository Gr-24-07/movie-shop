"use client";

import { Genre } from "@prisma/client";
import { deleteGenre, updateGenre } from "@/app/actions/genre";
import { useState } from "react";

export type GenreListProps = {
    genres: (Genre & { movies: { id: string; title: string }[] })[];
};

export default function GenreList({ genres }: GenreListProps) {
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [newGenreName, setNewGenreName] = useState("");

    const handleEdit = (genreId: string, currentName: string) => {
        setIsEditing(genreId);
        setNewGenreName(currentName);
    };

    const handleSave = async (genreId: string) => {
        await updateGenre({ id: genreId, name: newGenreName });
        setIsEditing(null);
    };

    const handleDelete = async (genreId: string) => {
        const confirmed = confirm("Are you sure you want to delete this genre?");
        if (confirmed) {
            await deleteGenre(genreId);
        }
    };

    return (
        <div className="flex justify-center my-4">
            <table className="shadow-md rounded-lg overflow-hidden bg-slate-300 min-w-96 text-center">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm tracking-wider">Genre Name</th>
                        <th className="px-6 py-3 text-left text-sm tracking-wider">Movies</th>
                        <th className="px-6 py-3 text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {genres.map((genre) => (
                        <tr key={genre.id} className="bg-gray-200 transition-colors hover:bg-gray-300">
                            <td className="px-6 py-2 whitespace-nowrap text-left text-sm">
                                {isEditing === genre.id ? (
                                    <input
                                        value={newGenreName}
                                        onChange={(e) => setNewGenreName(e.target.value)}
                                        className="border p-1 rounded"
                                    />
                                ) : (
                                    genre.name
                                )}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-left text-sm">
                                {genre.movies.length > 0 ? (
                                    <ul>
                                        {genre.movies.map((movie) => (
                                            <li key={movie.id}>{movie.title}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No movies assigned</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {isEditing === genre.id ? (
                                    <button
                                        onClick={() => handleSave(genre.id)}
                                        className="px-4 py-1 bg-green-500 text-white font-bold rounded-lg hover:bg-green-800"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(genre.id, genre.name)}
                                        className="px-4 py-1 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-800 "
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(genre.id)}
                                    className="px-4 py-1 bg-red-500 text-white font-bold rounded-lg hover:bg-red-800 mx-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
