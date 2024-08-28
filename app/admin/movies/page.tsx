import { deleteMovie, addMovie, updateMovie } from "@/app/actions/movies";
import prisma from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currencyFormatter } from "@/lib/formats";


export default async function AddMovie() {
  const movie = await prisma.movie.findMany();

  return (
    <>
      <div className="flex flex-col items-center my-4 shadow-md rounded-lg">
        <form className="flex flex-col gap-4 w-96">
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
        <div className="flex  ">
          <form className="flex flex-col w-fit gap-4  bg-blue-300">
            <h1 className="p-2 bg-blue-300 text-black font-bold rounded-lg">
              Movie List
            </h1>
            <>
            <Table className="flex flex-col gap-4 bg-slate-300">
              <TableHeader className="flex  bg-slate-300">
                <TableRow>
                <TableHead className="p-2 text-center font-bold flex-1">Title</TableHead>
                <TableHead className="p-2 text-center font-bold flex-1">ReleaseDate</TableHead>
                <TableHead className="p-2 text-center font-bold flex-1">Description</TableHead>
                <TableHead className="p-2 text-center font-bold flex-1">Price</TableHead>
                <TableHead className="p-2 text-center font-bold flex-1">Stock</TableHead>
                <TableHead className="p-2 text-center font-bold flex-1">imageURL</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                  {movie.map((movie) =>{
                    return(
                      <TableRow
                      key={movie.id}
                  
                     >
                      <TableCell className="p-2 text-center font-bold flex-1">{movie.title}</TableCell>
                      <TableCell className="p-2 text-center font-bold flex-1">{movie.releaseDate.toLocaleDateString()}</TableCell>
                      <TableCell className="p-2 text-center font-bold flex-1">{movie.description}</TableCell>
                      <TableCell className="p-2 text-center font-bold flex-1">{currencyFormatter.format(Number(movie.price))}</TableCell>
                      <TableCell className="p-2 text-center font-bold flex-1">{movie.stock}</TableCell>
                      <TableCell className="p-2 text-center font-bold flex-1">{movie.imageURL}</TableCell>
                      <TableCell><Link
                      className="text-center font-bold bg-green-700 h-10 w-24 rounded-l-md"
                      href={`/admin/movies/${movie.id}`}
                    >
                      Link
                    </Link>
                    <button
                      className="h-9 w-36 bg-red-800 text-white font-bold  rounded-lg hover:bg-blue-800"
                      formAction={async () => {
                        "use server";
                        await deleteMovie(movie.id);
                      }}
                    >
                      Delete
                    </button></TableCell>
                      
                     </TableRow>
                    );
                  } )}
                </TableBody>
              
                    
                    
                  </Table>
                 </>
                 </form>
                 </div>
                 </div>
                 </>
                 );
                 }
    
  

