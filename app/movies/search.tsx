"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function MovieSearch({ query }: { query?: string }) {
    const [searchTerm, setSearchTerm] = useState(query || "");
    const searchParams = useSearchParams();

    const pathname = usePathname();
    const { push } = useRouter();

    useEffect(() => {
        setSearchTerm(searchParams.get("query") || "");
    }, [searchParams]);

    function handleSearch(term: string) {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col items-center">
            <form
                className="flex w-full space-x-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(searchTerm);
                }}
            >
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button type="submit">
                    <Search />
                </Button>
            </form>
        </div>
    );
}
