"use client";

import prisma from "@/lib/db";
import { DeleteButton } from "./deletebotton";
import { EditButton } from "./editbutton";


export default async function GenreList() {
    const genres = await prisma.genre.findMany();

    return (
        <div className="p-10 flex items-center justify-center min-h-screen">
            <table className="shadow-md rounded-lg overflow-hidden bg-slate-300 min-w-96">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">Genre List</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {genres.map((genre) => (
                        <tr key={genre.id} className="hover:bg-gray-100 text-sm">
                            <td className="px-6 py-4 whitespace-nowrap">{genre.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <EditButton genre={genre} /> 
                                </td>
                            <td>
                                <DeleteButton id={genre.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 