import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "../movie-card";
import { Movie } from "@prisma/client";
import Link from "next/link";

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
            <div className="flex items-center">
                <Link
                    href="/movies"
                    className="text-sm text-black hover:underline mr-4"
                >
                    See all movies
                </Link>
                <button className="p-1">
                    <ArrowLeft size={20} />
                </button>
                <button className="p-1">
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
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
        <main className="max-w-full mx-auto space-y-16 py-8 px-4 sm:px-6 lg:px-8">
            <ProductGrid title="NEW RELEASES" movies={newArrivals} />
            <ProductGrid title="BESTSELLERS" movies={bestsellers} />
            <ProductGrid title="CLASSICS" movies={classics} />
            <ProductGrid title="ON SALE" movies={onSale} />
        </main>
    );
}
