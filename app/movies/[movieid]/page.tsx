import { currencyFormatter } from "@/lib/formats";
import { GetServerSideProps, NextPage } from "next";
import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { addToCart } from "@/app/actions/cart";
import { notFound } from "next/navigation";

export default async function DetailsMovie({
  params,
}: {
  params: {
    movieid: string;
  };
}) {
  const id = params.movieid;
  const movie = await prisma.movie.findUnique({
    where: { id: id },
    include: {
      genres: true,
      peopleJob: {
        include: {
          people: true,
        },
      },
    },
  });

  if (!movie) return notFound();

  return (
    <div className="container mx-auto flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center">{movie?.title}</h1>

      <div className="flex flex-col gap-2 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold border-b border-gray-300">
            Description
          </p>
          <p className="text-justify">{movie?.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold border-b border-gray-300">
            Price
          </p>
          <p className="text-3xl font-bold text-red-500">
            {currencyFormatter.format(Number(movie?.price))}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold border-b border-gray-300">
            Release Date
          </p>
          <p className="text-lg font-semibold text-gray-500">
            {movie?.releaseDate.toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold border-b border-gray-300">
            Genres
          </p>
          <ul className="flex flex-wrap gap-2">
            {movie?.genres.map((genre) => (
              <li
                className="flex flex-col place-items-center rounded-lg bg-slate-200 p-2"
                key={genre.id}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold border-b border-gray-300">
            People
          </p>
          <ul className="flex flex-wrap gap-2">
            {movie?.peopleJob.map((peoplejob) => (
              <li
                className="flex flex-col place-items-center rounded-lg bg-slate-200 p-2"
                key={peoplejob.id}
              >
                <p className="text-center text-lg font-bold">
                  {peoplejob.jobTitle}
                </p>
                <p className="text-center text-sm">{peoplejob.people.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-start p-4 w-full">
        <p className="text-3xl font-bold text-center text-cyan-600 border-spacing-2 bordeer-black">
          Stock: {movie?.stock}
        </p>
        <div className="flex flex-col gap-2 ">
          <Image
            src={movie?.imageURL || ""}
            alt="Picture of the movie"
            width={200}
            height={100}
            className="rounded-lg shadow-md "
          />
        </div>

        <form
          action={async () => {
            "use server";
            await addToCart({
              id: movie.id,
              price: movie.price.toNumber(),
              title: movie.title,
            });
          }}
        >
          <button className="w-full p-2 text-center font-bold bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700">
            Add To Cart
          </button>
        </form>
      </div>
    </div>
  );
}
