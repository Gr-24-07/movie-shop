import prisma from "@/lib/db";
import MovieCard from "../components/movie-card";
import Search from "../admin/movies/search";
import GenreFilter from "./genrefilter";
import { serializeMovie } from "@/lib/utils";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        genre?: string;
    };
}) {
    const query = searchParams?.query;
    const genre = searchParams?.genre;
    const movies = await prisma.movie.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive",
            },
            genres: {
                some: {
                    name: genre,
                },
            },
        },
    });

    const genres = await prisma.genre.findMany();

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <div className="flex justify-center ">
                <Search query={query} />
                <GenreFilter query={genre} genres={genres} />
            </div>
            <div className="flex gap-4 justify-evenly flex-wrap">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={serializeMovie(movie)} />
                ))}
            </div>
        </div>
    );
}
