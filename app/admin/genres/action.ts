"use server";

import { redirect } from "next/navigation";
import { AddGenreSchema } from "./schema";
import prisma from "@/lib/db";


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

   
    redirect("/");

   
}
