import DeleteMovie, { addmovie, updateMovie } from "@/app/actions/movies";
import prisma from "@/lib/db";

export default async function AddMovie() {
  const movie = await prisma.movie.findMany();

  return (
    <>
    <div className="flex flex-col items-center">
      <form action={addmovie} className="flex flex-col w-1/2 gap-4">
        <input
          className="text-left font-bold bg-slate-100"
          type="text"
          placeholder="Movie Title"
          required
          name="title"
        />
        <input
          className="text-left font-bold bg-slate-100"
          type="text"
          placeholder="Movie Description"
          name="description"
          required
        />
        <input
          className="text-left font-bold bg-slate-100"
          type="number"
          placeholder="Movie Price"
          name="price"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="date"
          placeholder="Movie releaseDate"
          name="releaseDate"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="number"
          placeholder="Movie Stock"
          name="stock"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="string"
          placeholder="Movie imageURL"
          name="imageURL"
          required
        />

        <button className="p-2 bg-blue-600 text-white rounded-lg">
          Add Movie
        </button>
      </form>

      <div className="flex  ">
        <form className="flex flex-col w-fit gap-4  bg-blue-300"> 
          <h1 className="p-2 bg-slate-300 text-black font-bold rounded-lg">
            Movie List
          </h1>
          <ul>
            {movie.map((movie) => (
              <li className="p-2 text-justify-auto" key={movie.id}>
                <h2 className=" p-1 border border-spacing-1 border-black text-left font-bold bg-slate-200">{`${movie.title}`}</h2>
                <p className=" p-1 border border-spacing-1  border-black  text-left font-bold bg-slate-200">
                  ReleaseDate: {`${movie.releaseDate}`}
                </p>
                <p className=" p-1 border border-spacing-1  border-black text-left font-bold bg-slate-200">
                  Description: {movie.description}
                </p>
                <p className=" p-1 border border-spacing-1  border-black text-left font-bold bg-slate-200">
                  Price: {`${movie.price}`}
                </p>
                <p className=" p-1 border border-spacing-1  border-black text-left font-bold bg-slate-200">
                  Stock: {movie.stock}
                </p>
                <p className=" p-1 border border-spacing-1  border-black text-left font-bold bg-slate-200">
                  imageURL: {movie.imageURL}
                </p>
                

                <button
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  formAction={async () => {
                    "use server";
                    await DeleteMovie(movie.id);
                    
                  }}
                  >
                  Delete
                </button>

                  

                
            

        <input
          className="text-left font-bold bg-slate-100"
          type="text"
          placeholder="Movie Title"
          required
          name="title"
        />
        <input
          className="text-left font-bold bg-slate-100"
          type="text"
          placeholder="Movie Description"
          name="description"
          required
        />
        <input
          className="text-left font-bold bg-slate-100"
          type="number"
          placeholder="Movie Price"
          name="price"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="date"
          placeholder="Movie releaseDate"
          name="releaseDate"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="number"
          placeholder="Movie Stock"
          name="stock"
          required
        />

        <input
          className="text-left font-bold bg-slate-100"
          type="string"
          placeholder="Movie imageURL"
          name="imageURL"
          required
        />
        <button formAction={async (formData) => {
                    "use server";
                    await updateMovie(formData,movie.id);
                    
                  }} className="p-2 bg-blue-600 text-white rounded-lg">
           Update Movie
         </button>
              </li>
           ))};
          </ul>
          </form>
         
      </div>
    </div>
    </>
  );

}
