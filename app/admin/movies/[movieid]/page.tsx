import { updateMovie } from "@/app/actions/movies";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import UpdateMovieForm from "../update-movie-form";

export default async function UpdateMovie({
    params,
}: {
    params: {
        movieid: string;
    };
}) {
    const id = params.movieid;
    const movie = await prisma.movie.findUnique({ where: { id: id } });

    if (!movie) {
        notFound();
    }

    return (
        <>
            <div className="flex justify-center my-4 shadow-md rounded-lg overflow-hidden bg-white min-w-96 text-center">
                <UpdateMovieForm movie={movie}></UpdateMovieForm>
            </div>
        </>
    );
}
