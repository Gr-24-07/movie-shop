import prisma from "@/lib/db";
import MovieCard from "../components/movie-card";

export default async function Page() {
    const movies = await prisma.movie.findMany();

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <div>
                <div className="flex gap-4 justify-between flex-wrap">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}
