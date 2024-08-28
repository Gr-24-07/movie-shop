"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getMovies() {
    return await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
        },
    });
}
revalidatePath("/genre");