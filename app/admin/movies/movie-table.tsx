import { deleteMovie } from "@/app/actions/movies";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { currencyFormatter } from "@/lib/formats";
import Image from "next/image";
import Link from "next/link";

export default async function MovieTable() {
    const movie = await prisma.movie.findMany({});
    return (
        <div>
            <form>
                <h1 className="p-2 bg-blue-600 text-white text-center rounded-md mt-4">
                    Movie List
                </h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Title</TableHead>
                            <TableHead>ReleaseDate</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>imageURL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movie.map((movie) => {
                            return (
                                <TableRow key={movie.id}>
                                    <TableCell className="">
                                        <Link
                                            className="text-center text-sm font-bold text-blue-600 border-b-2 border-blue-600"
                                            href={`/admin/movies/${movie.id}`}
                                        >
                                            {movie.title}
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        {movie.releaseDate.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{movie.description}</TableCell>
                                    <TableCell className="font-bold">
                                        {currencyFormatter.format(
                                            Number(movie.price)
                                        )}
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        {movie.stock}
                                    </TableCell>
                                    <TableCell>
                                        <Image
                                            src={movie.imageURL || ""}
                                            alt=""
                                            height={100}
                                            width={200}
                                        ></Image>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            formAction={async () => {
                                                "use server";
                                                await deleteMovie(movie.id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </form>
        </div>
    );
}
