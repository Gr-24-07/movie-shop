"use client";
import React, { useEffect, useState } from "react";
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
    const { push } = useRouter();

    useEffect(() => {
        setGenreTerm(searchParams.get("genre") || "");
    }, [searchParams]);

    function handlegenrefilter(term: string) {
        console.log(`filter... ${term}`);

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("genre", term);
        } else {
            params.delete("genre");
        }
        push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col items-center">
            <form
                className="flex min-w-2 space-x-2 w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    handlegenrefilter(genreTerm);
                }}
            >
                <div className="relative min-w-4 w-full">
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
