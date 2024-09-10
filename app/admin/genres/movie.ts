"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// To get all movies from the database
export async function getMovies() {
    return await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
        },
        orderBy: {
            title: 'asc', // Sort by movie title in ascending order
        },
    });
}
revalidatePath("/genre");