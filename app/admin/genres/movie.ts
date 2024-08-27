"use server";

import prisma from "@/lib/db";

export async function getMovies() {
    return await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
        },
    });
}
