"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AddGenreSchema } from "../admin/genres/schema";


export type AddGenreSuccess = {
    success: true;
};

export type AddGenreFailure = {
    success: false;
    errors: Zod.ZodFormattedError<{
        name: string;
        
    }, string>;
};

export type AddGenreResult = AddGenreSuccess | AddGenreFailure;

export async function AddGenreAction(formData: FormData): Promise<AddGenreResult> {
    const data = Object.fromEntries(formData);

    const parseResult = await AddGenreSchema.safeParseAsync(data);

    if (!parseResult.success) {
        const formattedErrors = parseResult.error.format();
        return {
            success: false,
            errors: formattedErrors,
        };
    }

    await prisma.genre.create({
        data: parseResult.data
    });


    revalidatePath("/genres"); 

    return { success: true };
}

export default async function DeleteGenre(id: string) {
    await prisma.genre.delete({
        where: {
            id,
        },
    });

    revalidatePath("/genres"); 
}

export async function EditGenre(id: string, data: {
    name: string 
}) {
    try {
        await prisma.genre.update({
            where: {
                id: id,
            },
            data: {
                name: data.name, 
               
            },
        });
        revalidatePath("/genres");
        
    } catch (error) {
        console.error("Failed to edit genre:", error);
    }
}
