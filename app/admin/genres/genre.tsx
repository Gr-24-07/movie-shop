"use client";

import { useState } from "react";
import { type Genre } from "@prisma/client";
import { deleteGenre, updateGenre } from "../../actions/genre";

export type GenreProps = {
    genre: Genre;
};

export default function Genre({ genre }: GenreProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(genre.name);

    async function handleDelete() {
        const answer = confirm("Are you sure? Do you want to delete this genre?");
        if (answer) {
            await deleteGenre(genre.id);
        }
    }

    async function handleSave() {
        if (!newName.trim()) {
            alert("Genre name cannot be empty.");
            return;
        }

        await updateGenre({
            id: genre.id,
            name: newName.trim(),
        });

        setIsEdit(false);
    }

    return (
        <tr className="bg-gray-200 transition-colors hover:bg-gray-300">
            <td className="px-6 py-2 whitespace-nowrap text-left text-sm">
                {isEdit ? (
                    <input
                        autoFocus
                        value={newName}
                        onChange={(ev) => setNewName(ev.target.value)}
                        className="bg-transparent border-b border-black"
                        onKeyUp={(ev) => {
                            switch (ev.code) {
                                case "Enter":
                                    handleSave();
                                    break;
                                case "Escape":
                                    setIsEdit(false);
                                    break;
                                default:
                                    break;
                            }
                        }}
                    />
                ) : (
                    <span className="block transition-colors text-black">
                        {genre.name}
                    </span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {isEdit ? (
                    <button
                        className="px-4 py-1 bg-green-500 text-white font-bold rounded-lg hover:bg-green-800"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="px-4 py-1 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-800 "
                        onClick={() => setIsEdit(true)}
                    >
                        Edit
                    </button>
                )}
                <button
                    className="px-4 py-1 bg-red-500 text-white font-bold rounded-lg hover:bg-red-800 mx-2"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
