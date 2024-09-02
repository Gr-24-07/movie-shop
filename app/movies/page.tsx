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
        <div className="container space-y-6 max-w-screen-lg">
            <Search
                query={query}
            />
            <div className="flex gap-4 justify-between flex-wrap">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
