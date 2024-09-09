"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Genre } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function GenreFilter({
    query,
    genres,
}: {
    query?: string;
    genres: Genre[];
}) {
    const [genreTerm, setGenreTerm] = useState(query || "");
    const searchParams = useSearchParams();

    const pathname = usePathname();
    const { replace } = useRouter();

    function handlegenrefilter(term: string) {
        console.log(`filter... ${term}`);

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("genre", term);
        } else {
            params.delete("genre");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="mt-4 flex flex-col items-center md:mt-8">
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
                        onChange={(e) => {
                            setGenreTerm(e.target.value);
                            handlegenrefilter(e.target.value);
                        }}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    >
                        <option value="">All Genres</option>
                        {genres.map((GenreFilter) => (
                            <option
                                key={GenreFilter.id}
                                value={GenreFilter.name}
                            >
                                {GenreFilter.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
}
