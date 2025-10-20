"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Movie {
  id: string;
  title: string;
  imageURL?: string;
  price: number;
}

export default function MovieSearch({ query }: { query?: string }) {
  const [searchTerm, setSearchTerm] = useState(query || "");

  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams();
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-4 flex flex-col items-center md:mt-8">
      <h1 className="text-3xl font-bold">Movie Search</h1>
      <form
        className="flex w-full mt-4 space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchTerm);
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies by title"
          className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}
