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

    // Fetch the current genre with its movies
    const currentGenre = await prisma.genre.findUnique({
        where: { id },
        include: { movies: { select: { id: true } } },
    });

    if (!currentGenre) {
        throw new Error("Genre not found");
    }

    const currentMovies = currentGenre.movies.map(movie => movie.id);

    // Determine which movies to add and which to remove
    const moviesToAdd = movies ? movies.filter(movieId => !currentMovies.includes(movieId)) : [];
    const moviesToRemove = currentMovies.filter(movieId => !movies?.includes(movieId));

    await prisma.genre.update({
        where: { id },
        data: {
            ...data,
            movies: {
                disconnect: moviesToRemove.map(movieId => ({ id: movieId })),
                connect: moviesToAdd.map(movieId => ({ id: movieId })),
            },
        },
    });

    // Invalidate cache or refresh path if needed
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
        orderBy: {
            name: 'asc', // Sort by genre name in ascending order
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
// Function to update only the genre's name
export async function updateGenreName(updatedGenre: { id: string; name: string }) {
    const { id, name } = updatedGenre;

    // Only update the genre name, leaving the movies untouched
    await prisma.genre.update({
        where: { id },
        data: {
            name, // Update the genre name only
        },
    });
}