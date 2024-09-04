import { deleteMovie, addMovie } from "@/app/actions/movies";
import prisma from "@/lib/db";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/formats";
import Image from "next/image";

export default async function AddMovie(){
  const movie = await prisma.movie.findMany({
      
      });
    

  return (
    <>
      <div className="flex flex-col items-center my-4 shadow-md rounded-lg">
      
        <form className="flex flex-col gap-4 w-96"
         action={addMovie}
         
         >
          <h2 className="text-2xl font-bold text-center mb-4">Add Movie</h2>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="title">
              Title
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="text"
              id="title"
              placeholder="Movie Title"
              required
              name="title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              className="p-2 rounded-md border border-gray-300 resize-none"
              id="description"
              placeholder="Movie Description"
              required
              name="description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="price">
              Price
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="number"
              id="price"
              placeholder="Movie Price"
              required
              name="price"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="releaseDate">
              Release Date
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="date"
              id="releaseDate"
              placeholder="Movie releaseDate"
              required
              name="releaseDate"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="stock">
              Stock
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="number"
              id="stock"
              placeholder="Movie Stock"
              required
              name="stock"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="imageURL">
              Image URL
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="string"
              id="imageURL"
              placeholder="Movie imageURL"
              required
              name="imageURL"
            />
          </div>
          <button className="p-2 bg-blue-600 text-white rounded-md mt-4">
            Add Movie
          </button>
        </form>
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
                      <TableCell className="p-1 border-r-2">
                        <Link
                          className="text-center text-sm font-bold text-blue-600 border-b-2 border-blue-600 p-1 "
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
                        {currencyFormatter.format(Number(movie.price))}
                      </TableCell >
                      <TableCell className="font-semibold">{movie.stock}</TableCell>
                      <TableCell>
                        <Image
                          src={movie.imageURL || ""}
                          alt=""
                          height={100}
                          width={200}
                        ></Image>
                      </TableCell>
                      <TableCell>
                        <button
                          className="h-9 w-36 bg-red-500 text-white font-bold  rounded-lg "
                          formAction={async () => {
                            "use server";
                            await deleteMovie(movie.id);
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </form>
        </div>
      </div>
    </>
  );
}
