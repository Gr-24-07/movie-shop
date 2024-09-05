"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createGenre(name: string) {
    await prisma.genre.create({
        data: {
            name,
        },
    });
    revalidatePath("/genre");
}

export async function deleteGenre(id: string) {
    await prisma.genre.update({
        where: {
            id,
        },
        data: {
            deletedDate: new Date(),
        },
    });
    revalidatePath("/genre");
}

type UpdateGenre = {
    id: string;
    name?: string;
    movies?: string[];
};

export async function updateGenre(updatedGenre: UpdateGenre) {
    const { id, movies, ...data } = updatedGenre;
    await prisma.genre.update({
        where: { id },
        data: {
            ...data,
            movies: {
                set: movies ? movies.map((movieId) => ({ id: movieId })) : [],
            },
        },
    });
    revalidatePath("/genre");
}

export async function getGenres() {
    return await prisma.genre.findMany({
        where: {
            deletedDate: null,  // Fetch only genres that haven't been "deleted"
        },
        select: {
            id: true,
            name: true,
            movies: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
    });
}
