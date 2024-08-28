

import  { updateMovie } from "@/app/actions/movies";
import prisma from "@/lib/db";
import { useRouter } from 'next/router'


 


export default async function UpdateMovie({params}: { params: {
  movieid: string
}}) {

  const id = params.movieid
  const movie = await prisma.movie.findUnique({ where: {id: id}})
//   const [formData, setFormData] = useState({
//     name: updateMovie.name,
// });
// const [isEditing, setIsEditing] = useState(false);
  
  
  return (
    <>
    <div className="flex justify-center my-4 shadow-md rounded-lg overflow-hidden bg-slate-300 min-w-96 text-center">

      <form >
      
        <input
          className="text-left font-bold bg-slate-100"
          type="text"
          placeholder="Movie Title"
          defaultValue={movie?.title}
          
          required
          name="title"
        />


        <input
          className="text-left font-bold bg-slate-100"
          type="text"
          placeholder="Movie Description"
          defaultValue={movie?.description || ""}
          name="description"
          required
        />
        <input
          className="text-left font-bold bg-slate-100"
          type="number"
          placeholder="Movie Price"
          defaultValue={movie?.price.toString() || ""}
          name="price"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="date"
          placeholder="Movie releaseDate"
          defaultValue={movie?.releaseDate.toDateString() || ""}
          name="releaseDate"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="number"
          placeholder="Movie Stock"
          defaultValue={movie?.stock}
          name="stock"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="string"
          placeholder="Movie imageURL"
          defaultValue={movie?.imageURL || ""}
          name="URL"

          required
        />
        
        <button type="submit"
         formAction={async (formData) => {
                    "use server";
                    await updateMovie(formData, id);
        
                    
         }} className="p-2 bg-blue-600 text-white rounded-lg">
           Update Movie  
         </button> 
        
         </form>
         </div>
         </>
  )};

