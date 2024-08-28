'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  imageURL?: string;
  price: number;
}

interface ShoppingExperienceProps {
  newArrivals: Movie[];
  bestsellers: Movie[];
  classics: Movie[];
  onSale: Movie[];
}

const ProductGrid: React.FC<{ title: string; movies: Movie[] }> = ({ title, movies }) => (
  <section className="mb-16">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex items-center">
        <a href="#" className="text-sm text-blue-600 hover:underline mr-4">See all movies</a>
        <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 mr-2">
          <ArrowLeft size={20} />
        </button>
        <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Card key={movie.id} className="overflow-hidden border-none duration-300 bg-white">
          <CardContent className="p-0">
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={movie.imageURL || '/placeholder-image.jpg'}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-gray-900 font-medium text-sm mb-1 truncate" title={movie.title}>{movie.title}</h3>
              <div className="text-gray-700 text-sm font-bold">
                {movie.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default function ShoppingExperience({
  newArrivals,
  bestsellers,
  classics,
  onSale
}: ShoppingExperienceProps) {
  return (
    <main className="max-w-7xl mx-auto space-y-16 py-8 px-4 sm:px-6 lg:px-8">
      <ProductGrid title="New Releases" movies={newArrivals} />
      <ProductGrid title="Bestsellers" movies={bestsellers} />
      <ProductGrid title="Classics" movies={classics} />
      <ProductGrid title="On Sale" movies={onSale} />
    </main>
  );
}