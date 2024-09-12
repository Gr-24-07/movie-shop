"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type Unauthorized = {
    success: false;
    status: "401";
    message: string;
};

const UpdateUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
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
    const session = await auth();

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

    if (session?.user.email !== data.prevEmail) {
        throw new Error("Unauthorized");
    }

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
    name: z.string().min(1, "Name is required").optional(),
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
): Promise<AdminUpdateUserResult> {
    const session = await auth();
    session?.user.role;

    if (session?.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

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
    const session = await auth();

    if (
        session?.user.id !== formData.get("id") &&
        session?.user.role !== "ADMIN"
    ) {
        throw new Error("Unauthorized");
    }

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

    revalidatePath("/checkout");
    revalidatePath("/user");

    return { success: true };
}

export async function getUserAddress(id: string) {
    const session = await auth();

    if (session?.user.id !== id && session?.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const address = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            country: true,
            city: true,
            address: true,
            zip: true,
        },
    });

    if (
        address?.address === null &&
        address.city === null &&
        address.country === null &&
        address.zip === null
    ) {
        return null;
    }

    return address;
}

export async function getRecommendations(userId: string) {
    const orders = await prisma.order.findMany({
        where: {
            userId: userId,
        },
        include: {
            orderItems: {
                include: {
                    movie: {
                        include: {
                            genres: true,
                        },
                    },
                },
            },
        },
    });

    let genresArray: string[] = [];

    orders.forEach((order) => {
        order.orderItems.forEach((orderItem) => {
            orderItem.movie.genres.forEach((genre) => {
                genresArray.push(genre.name);
            });
        });
    });

    const genreCountMap = new Map<string, number>();

    genresArray.forEach((genre) => {
        genreCountMap.set(genre, (genreCountMap.get(genre) || 0) + 1);
    });

    let sortedGenreArray = Array.from(genreCountMap.entries());

    sortedGenreArray.sort((a, b) => b[1] - a[1]);

    const sortedGenreObjects = sortedGenreArray.map(([genre, count]) => ({
        genre,
        count,
    }));

    const topGenre = sortedGenreObjects[0]?.genre || "Drama";

    const moviesFromTopGenre = await prisma.movie.findMany({
        where: {
            genres: {
                some: {
                    name: topGenre,
                },
            },
        },
        orderBy: {
            OrderItem: { _count: "desc" },
        },
    });

    let ownedMovies: string[] = [];

    orders.forEach((order) => {
        order.orderItems.forEach((orderItem) => {
            ownedMovies.push(orderItem.movieId);
        });
    });

    const filteredMovies = moviesFromTopGenre.filter((movie) => {
        return !ownedMovies.includes(movie.id);
    });

    return filteredMovies.slice(0, 5);
}
