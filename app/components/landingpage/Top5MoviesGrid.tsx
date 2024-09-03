import React from "react";
import MovieCard from "../movie-card";
import { Movie } from "@prisma/client";
import { serializeMovie } from "@/lib/utils";

interface Top5MoviesGridProps {
    newArrivals: Movie[];
    bestsellers: Movie[];
    classics: Movie[];
    onSale: Movie[];
}

const ProductGrid: React.FC<{ title: string; movies: Movie[] }> = ({
    title,
    movies,
}) => (
    <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-medium font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex gap-4 justify-between">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={serializeMovie(movie)}
                ></MovieCard>
            ))}
        </div>
    </section>
);

export default function MoviesGridViewProps({
    newArrivals,
    bestsellers,
    classics,
    onSale,
}: Top5MoviesGridProps) {
    return (
        <main className="container space-y-6 max-w-screen-lg">
            <ProductGrid title="NEW RELEASES" movies={newArrivals} />
            <ProductGrid title="BESTSELLERS" movies={bestsellers} />
            <ProductGrid title="CLASSICS" movies={classics} />
            <ProductGrid title="ON SALE" movies={onSale} />
        </main>
    );
}
