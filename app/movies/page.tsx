import prisma from "@/lib/db";
import MovieCard from "../components/movie-card";
import Search from "../admin/movies/search";
import GenreFilter from "./genrefilter";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        genre?: string;
    };
}) {
    const query = searchParams?.query
    const genre = searchParams?.genre
  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: query, 
        mode: "insensitive",
      },
      genres: {
        some: {
          name: genre,
        }
      }
    },
  });

  const genres = await prisma.genre.findMany();



    return (
        <div className="space-y-8">
          <div className="flex justify-center ">

            <Search
                query={query}
                
            />
          <GenreFilter query={genre} genres={genres}/>
          </div>
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
