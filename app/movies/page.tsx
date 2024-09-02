import prisma from "@/lib/db";
import MovieCard from "../components/movie-card";
import Search from "../admin/movies/search";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) {
    const query = searchParams?.query
  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: query || "", 
        mode: "insensitive",
      }
    }
  });



    return (
        <div className="space-y-8">
            <Search
                query={query}
            />

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <li key={movie.id} className="flex flex-col space-y-4">
                        <MovieCard movie={movie} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
