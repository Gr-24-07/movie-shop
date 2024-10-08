import { auth } from "@/auth";
import { getRecommendations } from "../actions/user";
import MovieCard from "./movie-card";
import { serializeMovie } from "@/lib/utils";

export default async function Recommendations() {
    const session = await auth();
    const userId = session?.user.id || "";
    const movies = await getRecommendations(userId);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-center">
                You might also like:
            </h1>
            <div className="flex gap-4 justify-center">
                {movies.map((movie) => {
                    return (
                        <MovieCard
                            key={movie.id}
                            movie={serializeMovie(movie)}
                        ></MovieCard>
                    );
                })}
            </div>
        </div>
    );
}
