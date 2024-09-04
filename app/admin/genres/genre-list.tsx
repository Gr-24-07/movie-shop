"use client";

import { type Genre } from "@prisma/client";
import { deleteGenre as deleteGenreAPI, updateGenre as updateGenreAPI } from "@/app/actions/genres";
import { useState } from "react";
import { Trash, Edit, Save, ChevronDown } from "lucide-react";


export type GenreListProps = {
    genres: (Genre & { movies: { id: string; title: string }[] })[];
};

export default function GenreList({ genres }: GenreListProps) {
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [newGenreName, setNewGenreName] = useState("");
    const [isDropDownOpen, setIsDropDownOpen ] = useState<string | null>(null);

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
    

    const toggleDropDown = (genreId: string) => {
        setIsDropDownOpen(isDropDownOpen === genreId ? null : genreId);
    };

    return (
        
        <div className="flex justify-center items-center min-h-screen my-4">
            <div className="hidden sm:block w-full">
                <table className="shadow-md rounded-lg overflow-hidden bg-slate-300 min-w-96 text-center border border-black mx-auto">
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
                                            className="px-4 py-1 bg-green-500 rounded-lg hover:bg-green-800"
                                        >
                                            < Save />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(genre.id, genre.name)}
                                            className="px-4 py-1 bg-blue-500  rounded-lg hover:bg-blue-900"
                                        >
                                            < Edit />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(genre.id)}
                                        className="px-4 py-1 bg-red-500 rounded-lg hover:bg-red-900 mx-2"
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
                        <button onClick={() => toggleDropDown(genre.id)}>
                            <ChevronDown />
                        </button>
                    </div>
                    {isDropDownOpen === genre.id && (
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
                                            className="px-4 py-1 bg-green-500 rounded-lg hover:bg-green-800"
                                        >
                                            <Save />
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(genre.id, genre.name)}
                                        className="px-4 py-1 bg-blue-500 rounded-lg hover:bg-blue-900"
                                    >
                                        <Edit />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(genre.id)}
                                    className="px-4 py-1 bg-red-500 rounded-lg hover:bg-red-900"
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