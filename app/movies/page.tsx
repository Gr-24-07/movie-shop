import prisma from "@/lib/db";
import MovieCard from "../components/movie-card";
import Search from "./search";
import GenreFilter from "./genrefilter";
import { serializeMovie } from "@/lib/utils";
import { ReleaseDateFilter } from "@/components/component/release-date-filter";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        genre?: string;
        startDate?: string;
        endDate?: string;
    };
}) {
    const query = searchParams?.query;
    const genre = searchParams?.genre;
    const startDate = searchParams?.startDate
        ? new Date(searchParams.startDate)
        : undefined;
    const endDate = searchParams?.endDate
        ? new Date(searchParams.endDate)
        : undefined;
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
            releaseDate: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    const genres = await prisma.genre.findMany();

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <div className="flex justify-center gap-2">
                <ReleaseDateFilter></ReleaseDateFilter>
                <GenreFilter query={genre} genres={genres} />
                <Search query={query} />
            </div>
            <div className="flex gap-4 justify-evenly flex-wrap">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={serializeMovie(movie)} />
                ))}
            </div>
        </div>
    );
}
