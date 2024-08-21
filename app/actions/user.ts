"use server";

import prisma from "@/lib/db";
import { z } from "zod";

const UpdateUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    prevEmail: z.string().email(),
});

type UpdateUserFail = {
    success: false;
    errors: z.ZodFormattedError<
        {
            name: string;
            email: string;
        },
        string
    >;
};

type UpdateUserSuccess = {
    success: true;
    data: {
        name: string;
        email: string;
    };
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
            email: data.prevEmail,
        },
        data: {
            name: data.name,
            email: data.email,
        },
    });

    return {
        success: true,
        data: data,
    };
}
