"use client";

import { useTransition } from "react";
import DeleteGenre from "@/app/actions/genres";

export function DeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(() => {
            DeleteGenre(id);
        });
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={isPending}
        >
            {isPending ? "Deleting..." : "Delete"}
        </button>
    );
}