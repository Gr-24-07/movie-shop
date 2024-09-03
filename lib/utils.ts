import { SerializedMovie } from "@/app/actions/movies";
import { Movie } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function serializeMovie(movie: Movie): SerializedMovie {
    return {
        ...movie,
        price: movie.price.toString(),
    };
}
