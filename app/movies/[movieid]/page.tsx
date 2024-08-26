import { currencyFormatter } from "@/lib/formats";
import { GetServerSideProps, NextPage } from "next";
import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export default async function DetailsMovie({params}: { params: {
    movieid: string
  }}) {
  
    const id = params.movieid
    const movie = await prisma.movie.findUnique({ where: {id: id}})

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-bold font-extrabold  bg-slate-500 border-spacing-0">{movie?.title}</h1>
            <p className=" text-center w-1/2 px-5 py-8 border border-separate font-mono bg-slate-300 p-0 border-0-gray-900">{movie?.description}</p>
            <p className="bg-red-400">{currencyFormatter.format(Number(movie?.price)) }</p>
            <p className="bg-blue-300">ReleaseDate: {movie?.releaseDate.toLocaleDateString()}</p>
            <p className="text-nowrap text-bold font-extrabold text-cyan-100 text-clip bg-slate-50">{movie?.stock}</p>
            <Image
            src={movie?.imageURL || ""}
            alt="Picture of the movie"
            width={200}
            height={50}
            />

            <button className="p-2 bg-blue-600 text-white rounded-lg">
                Shop
            </button>
            
        </div>

        
    );

  };

  

