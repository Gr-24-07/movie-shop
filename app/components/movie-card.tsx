import { currencyFormatter } from "@/lib/formats";
import { Movie } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="flex flex-col place items-center gap-1">
            <h2>{`${movie.title}`}</h2>
            <p>Release Date: {`${movie.releaseDate.toLocaleDateString()}`} </p>
            <p>Price: {`${currencyFormatter.format(Number(movie.price))}`} </p>
            <Image
                src={movie.imageURL || ""}
                alt="Picture of the movie"
                width={300}
                height={50}
            />
            <Link href={`/movies/${movie.id}`}>Link</Link>
            <button className="p-2 text-justify font-bold bg-green-500 px-2 py-3 rounded-lg">
                Add To Cart
            </button>
        </div>
    );
}
