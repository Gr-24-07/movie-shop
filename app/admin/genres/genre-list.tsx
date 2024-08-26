import prisma from "@/lib/db";
import GenreListClient from "./GenreListClient";

export default async function GenreList() {
    const genres = await prisma.genre.findMany();

    return (
        <div className="p-10 flex items-center justify-center min-h-screen">
            <GenreListClient genres={genres} />
        </div>
    );
}