import { currencyFormatter } from "@/lib/formats";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "../actions/cart";
import { SerializedMovie } from "../actions/movies";

type MovieCardProps = { movie: SerializedMovie };

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="flex flex-col aspect-[9/16] gap-1 w-40">
            <div className="relative aspect-[9/16] w-full">
                <Image src={movie.imageURL || ""} alt="" fill />
            </div>
            <div className="flex flex-col justify-between flex-grow">
                <h2 className="flex-grow">
                    <Link
                        className="text-blue-500 hover:text-blue-700 line-clamp-2"
                        href={`/movies/${movie.id}`}
                    >{`${movie.title}`}</Link>
                </h2>
                <p className="text-sm italic">
                    {`${movie.releaseDate.toLocaleDateString()}`}{" "}
                </p>
                <p className="font-semibold">{`${currencyFormatter.format(
                    Number(movie.price)
                )}`}</p>
                <form
                    action={async () => {
                        "use server";
                        await addToCart({
                            id: movie.id,
                            price: Number(movie.price),
                            title: movie.title,
                        });
                    }}
                >
                    <button className="w-full p-2 text-center font-bold bg-green-500 px-2 py-3 rounded-sm hover:bg-green-600 active:bg-green-700">
                        Add To Cart
                    </button>
                </form>
            </div>
        </div>
    );
}
