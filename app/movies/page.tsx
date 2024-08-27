import prisma from "@/lib/db";
import MovieCard from "../components/movie-card";

export default async function Page() {
    const movies = await prisma.movie.findMany();

    return (
        <div>
            <div>
                <ul className="grid grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <MovieCard movie={movie} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
