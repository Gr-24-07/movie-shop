"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UpdateUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    prevEmail: z.string().email(),
});

export type UpdateUserFail = {
    success: false;
    errors: z.ZodFormattedError<
        {
            name: string;
            email: string;
        },
        string
    >;
};

export type UpdateUserSuccess = {
    success: true;
    data: {
        name: string;
        email: string;
    };
};

export type UpdateUserResult = UpdateUserSuccess | UpdateUserFail;

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

export type AdminUpdateUserFail = {
    success: false;
    errors: z.ZodFormattedError<
        {
            id: string;
            name?: string | undefined;
            email?: string | undefined;
            role?: "USER" | "ADMIN" | undefined;
        },
        string
    >;
};

export type AdminUpdateUserSuccess = {
    success: true;
};

export type AdminUpdateUserResult =
    | AdminUpdateUserSuccess
    | AdminUpdateUserFail;

const AdminUpdateUserSchema = z.object({
    id: z.string().cuid(),
    name: z.string().min(1).optional(),
    email: z
        .string()
        .email()
        .refine(
            async (value) => {
                const count = await prisma.user.count({
                    where: {
                        email: value,
                    },
                });

                if (count > 0) {
                    return false;
                }

                return true;
            },
            { message: "Email is taken" }
        )
        .optional(),
    role: z.nativeEnum(Role).optional(),
});

export async function adminUpdateUser(
    id: string,
    name: string | undefined,
    email: string | undefined,
    role: Role | undefined
): Promise<AdminUpdateUserResult | void> {
    const session = await auth();
    session?.user.role;

    if (session?.user.role !== "ADMIN") {
        return;
    }

    console.log(id);
    console.log(name);
    console.log(email);
    console.log(role);

    const data = {
        id,
        name,
        email,
        role,
    };

    const parsedResult = await AdminUpdateUserSchema.safeParseAsync(data);

    if (!parsedResult.success) {
        const formattedErrors = parsedResult.error.format();

        return {
            success: false,
            errors: formattedErrors,
        };
    }

    await prisma.user.update({
        where: {
            id: parsedResult.data.id,
        },

        data: {
            name: parsedResult.data.name,
            email: parsedResult.data.email,
            role: parsedResult.data.role,
        },
    });

    revalidatePath("/admin");

    return {
        success: true,
    };
}

export type SetUserAddressFail = {
    success: false;
    errors: z.ZodFormattedError<
        {
            id: string;
            country: string;
            city: string;
            address: string;
            zip: string;
        },
        string
    >;
};

export type SetUserAddressSuccess = {
    success: true;
};

export type SetUserAddressResult = SetUserAddressSuccess | SetUserAddressFail;

const UserAddressSchema = z.object({
    id: z.string().min(1),
    address: z.string().min(1, "Please enter an address"),
    country: z.string().min(1, "Please select a country"),
    city: z.string().min(1, "Please enter a city"),
    zip: z.string().min(1, "Please enter a zipcode"),
});

export async function setUserAddress(
    formData: FormData
): Promise<SetUserAddressResult> {
    console.log(formData);

    const data = Object.fromEntries(formData.entries());

    const parsedResult = await UserAddressSchema.safeParseAsync(data);

    if (!parsedResult.success) {
        const formattedErrors = parsedResult.error.format();

        return {
            success: false,
            errors: formattedErrors,
        };
    }

    const parsedData = parsedResult.data;

    await prisma.user.update({
        where: { id: parsedData.id },
        data: {
            country: parsedData.country,
            address: parsedData.address,
            city: parsedData.city,
            zip: parsedData.zip,
        },
    });

    return { success: true };
}
