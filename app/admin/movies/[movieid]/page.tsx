"use client";

import  { updateMovie } from "@/app/actions/movies";
import prisma from "@/lib/db";
import { currencyFormatter } from "@/lib/formats";
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation';
import {Form} from'react-hook-form';



export default async function UpdateMovie({params}: { params: {
  movieid: string
}}) {

  const id = params.movieid
  const movie = await prisma.movie.findUnique({ where: {id: id}})
//   const [formData, setFormData] = useState({
//     name: updateMovie.name,
// });
// const [isEditing, setIsEditing] = useState(false);
async  function SearchMovie() {
  const search = useSearchParams();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(search);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
  }
  // ...
}


  

  
  
  return (
    <>
    
    <div className="flex justify-center my-4 shadow-md rounded-lg overflow-hidden bg-white min-w-96 text-center">

        <form className="flex flex-col gap-4 w-96" action={async (formData) => {
                    "use server";
                    await updateMovie(formData, id);
        
                    
         }} method="POST">
            <h2 className="text-2xl font-bold text-center mb-4">Update Movie</h2>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="title">
              Title
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="text"
              id="title"
              placeholder="Movie Title"
              defaultValue={movie?.title}
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
              defaultValue={movie?.description || ''}
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
              defaultValue={currencyFormatter.format(Number(movie?.price))}
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
              defaultValue={movie?.releaseDate.toISOString().split('T')[0]}
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
              defaultValue={movie?.stock}
              required
              name="stock"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="URL">
              Image URL
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="text"
              id="URL"
              placeholder="Movie imageURL"
              defaultValue={movie?.imageURL || ""}
              required
              name="URL"
            />
          </div>
          <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg">
             Update Movie
           </button> 
          
        </form>
         </div>
         </>
  )};

