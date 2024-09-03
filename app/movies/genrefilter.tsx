"use client";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { title } from "process";
import { Replace } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Genre } from "@prisma/client";


  export default function GenreFilter({ query, genres }: { query?: string, genres: Genre[] }) {
    const [genreTerm, setGenreTerm] = useState(query || "");
  
    const pathname = usePathname();
    const { replace } = useRouter();

    function handlegenrefilter(term: string) {
      console.log(`filter... ${term}`);
  
      const params = new URLSearchParams();
      if (term) {
        params.set("genre", term);
      } else {
        params.delete("genre");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  
    return (
      <div className="mt-4 flex flex-col items-center md:mt-8">
        <h1 className="text-3xl font-bold">Genre Filter</h1>
        <form
          className="flex min-w-2 mt-4 space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handlegenrefilter(genreTerm);
          }}
        >
          <div className="relative min-w-4">
            <select
              value={genreTerm}
              onChange={(e) => setGenreTerm(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Genres</option>
              {genres.map((GenreFilter)=> (
                <option key={GenreFilter.id} value={GenreFilter.name}>{GenreFilter.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <Replace className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-0 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600"
          >
            Genre Filter
          </button>
        </form>
      </div>
    );
  }