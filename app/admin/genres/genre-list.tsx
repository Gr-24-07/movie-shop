import Genre from "./genre";
import prisma from "@/lib/db";

export type GenreListProps = {};

export default async function GenreList({}: GenreListProps) {
    const genres = await prisma.genre.findMany();

    return (
        <div className="flex justify-center my-4">
            <table className="shadow-md rounded-lg overflow-hidden bg-slate-300 min-w-96 text-center">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm tracking-wider">
                            Genre Name
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {genres.map((genre) => (
                        <Genre key={`genre-list-item-${genre.id}`} genre={genre} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
