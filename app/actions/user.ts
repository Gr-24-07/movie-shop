"use server";

import prisma from "@/lib/db";
import { z } from "zod";

const UpdateUserSchema = z.object({
    id: z.string().cuid(),
    name: z.string().min(1),
    email: z.string().email(),
});

type UpdateUserFail = {
    success: false;
    errors: z.ZodFormattedError<
        {
            id: string;
            name: string;
            email: string;
        },
        string
    >;
};

type UpdateUserSuccess = {
    success: true;
};

type UpdateUserResult = UpdateUserSuccess | UpdateUserFail;

export default async function updateUser(
    formData: FormData
): Promise<UpdateUserResult> {
    console.log("Updating User");

    const result = Object.fromEntries(formData.entries());

    const parsedResult = await UpdateUserSchema.safeParseAsync(result);

    if (!parsedResult.success) {
        const formattedErrors = parsedResult.error.format();

        return {
            success: false,
            errors: formattedErrors,
        };
    }

    const data = parsedResult.data;

    await prisma.user.update({
        where: {
            id: data.id,
        },
        data: {
            name: data.name,
            email: data.email,
        },
    });

    return {
        success: true,
    };
}
