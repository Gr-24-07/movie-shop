"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/library";

// Define and export MovieResult type
export type MovieResult = 
  | { success: true; movies: { id: string; title: string; imageURL?: string; price: number; }[] }
  | { success: false; error: string };

// Validation schema for movie data
const movieValidation = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  releaseDate: z.coerce.date(),
  stock: z.coerce.number().int().nonnegative("Stock must be non-negative"),
  imageURL: z.string().url().optional(),
});

// Helper function to handle errors
const handleError = (error: unknown, errorMessage: string): MovieResult => {
  console.error(errorMessage, error);
  return { success: false, error: errorMessage };
};

// Helper function to process movie data
const processMovieData = (movies: any[]): { id: string; title: string; imageURL?: string; price: number; }[] => {
  return movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    imageURL: movie.imageURL || undefined,
    price: movie.price instanceof Decimal ? movie.price.toNumber() : movie.price,
  }));
};

export async function addMovie(formData: FormData): Promise<MovieResult> {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedData = await movieValidation.parseAsync(data);
    const movie = await prisma.movie.create({ data: validatedData });
    revalidatePath("/admin/movies");
    return { success: true, movies: [processMovieData([movie])[0]] };
  } catch (error) {
    return handleError(error, "Failed to add movie");
  }
}

export async function deleteMovie(id: string): Promise<MovieResult> {
  try {
    await prisma.movie.delete({ where: { id } });
    revalidatePath("/admin/movies");
    return { success: true, movies: [] };
  } catch (error) {
    return handleError(error, "Failed to delete movie");
  }
}

export async function updateMovie(formData: FormData, id: string): Promise<MovieResult> {
  try {
    const data = Object.fromEntries(formData);
    const validatedData = await movieValidation.parseAsync(data);
    const movie = await prisma.movie.update({
      where: { id },
      data: validatedData,
    });
    revalidatePath("/admin/movies");
    return { success: true, movies: [processMovieData([movie])[0]] };
  } catch (error) {
    return handleError(error, "Failed to update movie");
  }
}

export async function getMovies(): Promise<MovieResult> {
  try {
    const movies = await prisma.movie.findMany({
      select: { id: true, title: true, imageURL: true, price: true },
    });
    return { success: true, movies: processMovieData(movies) };
  } catch (error) {
    return handleError(error, "Failed to fetch movies");
  }
}

export async function getTopPurchasedMovies(limit: number = 5): Promise<MovieResult> {
  try {
    const movies = await prisma.movie.findMany({
      take: limit,
      orderBy: { OrderItem: { _count: 'desc' } },
      select: { id: true, title: true, imageURL: true, price: true },
    });
    return { success: true, movies: processMovieData(movies) };
  } catch (error) {
    return handleError(error, "Failed to fetch top purchased movies");
  }
}

export async function getMostRecentMovies(limit: number = 5): Promise<MovieResult> {
  try {
    const movies = await prisma.movie.findMany({
      take: limit,
      orderBy: { releaseDate: 'desc' },
      select: { id: true, title: true, imageURL: true, price: true },
    });
    return { success: true, movies: processMovieData(movies) };
  } catch (error) {
    return handleError(error, "Failed to fetch most recent movies");
  }
}

export async function getOldestMovies(limit: number = 5): Promise<MovieResult> {
  try {
    const movies = await prisma.movie.findMany({
      take: limit,
      orderBy: { releaseDate: 'asc' },
      select: { id: true, title: true, imageURL: true, price: true },
    });
    return { success: true, movies: processMovieData(movies) };
  } catch (error) {
    return handleError(error, "Failed to fetch oldest movies");
  }
}

export async function getMoviesOnSale(limit: number = 5): Promise<MovieResult> {
  try {
    const averagePrice = await prisma.movie.aggregate({
      _avg: { price: true }
    });

    const avgPrice = averagePrice._avg.price || 0;

    const movies = await prisma.movie.findMany({
      take: limit,
      where: { price: { lt: avgPrice } },
      orderBy: { price: 'asc' },
      select: { id: true, title: true, imageURL: true, price: true },
    });
    return { success: true, movies: processMovieData(movies) };
  } catch (error) {
    return handleError(error, "Failed to fetch movies on sale");
  }
}