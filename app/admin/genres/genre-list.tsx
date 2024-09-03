"use client";

import { useState } from "react";
import { Trash, Edit, Save, Menu, ChevronDown } from "lucide-react";
import { Genre } from "@prisma/client";

export type GenreListProps = {
    genres: (Genre & { movies: { id: string; title: string }[] })[];
};

export default function GenreList({ genres }: GenreListProps) {
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [newGenreName, setNewGenreName] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);

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

    const toggleMenu = (genreId: string) => {
        setIsMenuOpen(isMenuOpen === genreId ? null : genreId);
    };

    return (
        <div className="flex flex-col items-center my-4 w-full">
            <div className="hidden sm:block w-full">
                <table className="shadow-md rounded-lg overflow-hidden bg-slate-300 min-w-96 text-center border border-black w-full">
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
                                            <Save />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(genre.id, genre.name)}
                                            className="px-4 py-1 bg-blue-300  rounded-lg hover:bg-blue-500"
                                        >
                                            <Edit />
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

           
            <div className="sm:hidden w-full">
                {genres.map((genre) => (
                    <div key={genre.id} className="border border-gray-400 rounded-lg mb-4">
                        <div className="flex justify-between items-center bg-gray-700 text-white p-4">
                            <span>{genre.name}</span>
                            <button onClick={() => toggleMenu(genre.id)}>
                                <ChevronDown />
                            </button>
                        </div>
                        {isMenuOpen === genre.id && (
                            <div className="bg-gray-200 p-4">
                                <div>
                                    <strong>Movies:</strong>
                                    {genre.movies.length > 0 ? (
                                        <ul>
                                            {genre.movies.map((movie) => (
                                                <li key={movie.id}>{movie.title}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>No movies assigned</span>
                                    )}
                                </div>
                                <div className="mt-2 flex space-x-2">
                                    {isEditing === genre.id ? (
                                        <>
                                            <input
                                                value={newGenreName}
                                                onChange={(e) => setNewGenreName(e.target.value)}
                                                className="border p-1 rounded flex-1"
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
                                            <button
                                                onClick={() => handleSave(genre.id)}
                                                className="px-4 py-1 bg-green-300 rounded-lg hover:bg-green-800"
                                            >
                                                <Save />
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(genre.id, genre.name)}
                                            className="px-4 py-1 bg-blue-300 rounded-lg hover:bg-blue-500 flex-1"
                                        >
                                            <Edit />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(genre.id)}
                                        className="px-4 py-1 bg-red-300 rounded-lg hover:bg-red-500 flex-1"
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
function updateGenreAPI(arg0: { id: string; name: string; }) {
    throw new Error("Function not implemented.");
}

function deleteGenreAPI(genreId: string) {
    throw new Error("Function not implemented.");
}

