"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

//To create a new genre
export async function createGenre(name: string) {
    await prisma.genre.create({
        data: {
            name,
        },
    });
    revalidatePath("/genre");
}

// To mark a genre as deleted 
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

// To update an existing genre's name and associated movies
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

// To get all genres that are not deleted
export async function getGenres() {
    return await prisma.genre.findMany({
        where: {
            deletedDate: null,  
        },
        select: {
            id: true,
            name: true,
            deletedDate: true, 
            movies: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
    });
}

export async function getGenreMovies(genreId: string) {
    const genreWithMovies = await prisma.genre.findUnique({
        where: { id: genreId },
        include: { movies: true }, 
    });

    return genreWithMovies?.movies || []; 
}