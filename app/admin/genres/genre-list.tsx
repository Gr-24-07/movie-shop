"use client";

import { type Genre } from "@prisma/client";
import { deleteGenre as deleteGenreAPI, updateGenre as updateGenreAPI } from "@/app/actions/genres";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Edit } from "lucide-react";
import { Save } from "lucide-react";

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
        if (!newGenreName.trim()) {
            alert("Genre name cannot be empty.");
            return;
        }
        await updateGenreAPI({ id: genreId, name: newGenreName.trim() });
        setIsEditing(null);
    };

    const handleDelete = async (genreId: string) => {
        const confirmed = confirm("Are you sure? Do you want to delete this genre?");
        if (confirmed) {
            await deleteGenreAPI(genreId);
        }
    };

    return (
        <div className="flex justify-center my-4">
            <table className="shadow-md rounded-lg overflow-hidden bg-slate-300 min-w-96 text-center boder border-black">
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
                                        autoFocus
                                        onKeyUp={(e) => {
                                            switch (e.code) {
                                                case "Enter":
                                                    handleSave(genre.id);
                                                    break;
                                                case "Escape":
                                                    setIsEditing(null);
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}
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
                                        className="px-4 py-1 bg-green-300 rounded-lg hover:bg-green-800"
                                    >
                                        < Save />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(genre.id, genre.name)}
                                        className="px-4 py-1 bg-blue-300  rounded-lg hover:bg-blue-500"
                                    >
                                        < Edit />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(genre.id)}
                                    className="px-4 py-1 bg-red-300 rounded-lg hover:bg-red-500 mx-2"
                                >
                                    <Trash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
