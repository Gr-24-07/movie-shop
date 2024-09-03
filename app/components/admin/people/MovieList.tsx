import { getMovies } from "@/app/actions/movies";
import PeopleComponent from "./PeopleComponent";
import { serializeMovie } from "@/lib/utils";
import { Movie } from "@prisma/client";

type MovieResult =
    | { success: true; movies: Movie[] }
    | { success: false; error: string };

export default async function MovieList() {
    const result: MovieResult = await getMovies();

    if (!result.success) {
        console.error("Failed to fetch movies:", result.error);
        return <div>Failed to load movies. Please try again later.</div>;
    }

    const movies = result.movies.map((movie) => {
        return serializeMovie(movie);
    });

    return <PeopleComponent movies={movies} />;
}
