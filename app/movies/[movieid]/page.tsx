import { currencyFormatter } from "@/lib/formats";
import { GetServerSideProps, NextPage } from "next";
import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <div className="flex flex-col items-center p-2 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold text-center">
        {movie?.title}
      </h1>

      <div className="flex items-center justify-center w-80 py-4">
        <p className="text-lg font-semibold border border-spacing-1 border-black">
          {movie?.description}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex items-center">
          <p className="text-3xl font-bold text-red-500 border border-spacing-1 border-black">
            {currencyFormatter.format(Number(movie?.price))}
          </p>
          <p className="text-lg font-semibold text-gray-500 ml-4 border-spacing-1 border-slate-100">
            ReleaseDate: {movie?.releaseDate.toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-2xl font-bold text-center text-cyan-600">
          Stock: {movie?.stock}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src={movie?.imageURL || ""}
          alt="Picture of the movie"
          width={200}
          height={300}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-grow-4 my-4 rounded-lg  bg-slate-300 min-w-96 text-center">
        <h1 className="text-center font-extrabold border-separate border-black border-2">
          Genres
        </h1>
        <ul className="flex flex-wrap gap-2">
          {movie?.genres.map((genre) => (
            <li
              className="flex flex-col place-items-center rounded-lg bg-slate-200 p-2"
              key={genre.id}
            >
              {genre.name}
            </li>
          ))}
          {movie?.peopleJob.map((peoplejob) => (
            <li
              className="flex flex-col place-items-center rounded-lg bg-slate-200 p-2"
              key={peoplejob.id}
            >
              <p className="text-center text-lg font-bold">{peoplejob.jobTitle}</p>
              <p className="text-center text-sm">{peoplejob.people.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <button className="h-7 w-10 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-800">
        Shop
      </button>
    </div>
  );
}
