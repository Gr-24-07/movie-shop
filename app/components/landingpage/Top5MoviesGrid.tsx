'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Movie {
  id: string;
  title: string;
  imageURL?: string;
  price: number;
}

interface Top5MoviesGridProps {
  newArrivals: Movie[];
  bestsellers: Movie[];
  classics: Movie[];
  onSale: Movie[];
}

const ProductGrid: React.FC<{ title: string; movies: Movie[] }> = ({ title, movies }) => (
  <section className="mb-16">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-medium font-bold text-gray-900">{title}</h2>
      <div className="flex items-center">
        <a href="#" className="text-sm text-black hover:underline mr-4">See all movies</a>
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
        <Card key={movie.id} className="overflow-hidden border-none duration-300 bg-white rounded-none">
          <CardContent className="p-0">
            <div className="aspect-[3/3] relative overflow-hidden">
              <Image
                src={movie.imageURL || ''}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="rounded-none"
              />
            </div>
            <div className="p-4">
              <h3 className="text-gray-900 font-medium text-lg mb-2 truncate" title={movie.title}>{movie.title}</h3>
              <div className="text-gray-700 text-sm font-bold mb-2">
                {movie.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </div>
              <Button className="text-sm py-1 px-2 bg-black rounded text-white w-full">
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default function MoviesGridViewProps({
  newArrivals,
  bestsellers,
  classics,
  onSale
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
