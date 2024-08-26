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
    await prisma.genre.delete({
        where: {
            id,
        },
    });

    revalidatePath("/genre");
}

type UpdateGenre = {
    id: string;
    name?: string;
};

export async function updateGenre(updatedGenre: UpdateGenre) {
    const { id, ...data } = updatedGenre;
    await prisma.genre.update({
        where: {
            id,
        },
        data,
    });

    revalidatePath("/genre");
}