'use server'
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { bigint, string, z } from "zod";

const movievalidation = z.object({
        title: z.string(),
        description: z.string(),
        price: z.coerce.number().int(),
        releaseDate:z.coerce.date(),
        stock: z.coerce.number(),
        imageURL: z.string(),

});

export async function addmovie(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    let validatedData;

    try {
        validatedData = await movievalidation.parseAsync(data);
    } catch (error) {
        console.error('Validation error:', error);
        return;
    }

    if (!validatedData) {
        console.error("No validated data found");
        return;
    }

    try {
        await prisma.movie.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                price: validatedData.price,
                releaseDate: validatedData.releaseDate,
                stock: validatedData.stock,
                imageURL: validatedData.imageURL,
            }
        });
    } catch (error) {
        console.error(error);
        return;
    }
    revalidatePath("./movie");
}
