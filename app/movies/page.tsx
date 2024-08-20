"use client";

import { addmovie } from "../actions/movies";




export default function AddMovie() {
    
    return (
        <div className="flex justify-center">
        <form action={addmovie} className="flex flex-col w-1/2 gap-4">
            
            <input className="text-left font-bold bg-slate-100"
            type="text"
            placeholder="Movie Title"
            required
            name="title"
            />
            <input className="text-left font-bold bg-slate-100"
            type="text"
            placeholder="Movie Description"
            name="description"
           
            required
            />
            <input className="text-left font-bold bg-slate-100"
            type="number"
            placeholder="Movie Price"
            name="price"
            required
            />

           <input className="text-left font-bold bg-slate-100"
            type="date"
            placeholder="Movie releaseDate"
            name="releaseDate"
            required
            />

          <input className="text-left font-bold bg-slate-100"
            type="number"
            placeholder="Movie Stock"
            name="stock"
            required
            />

         <input className="text-left font-bold bg-slate-100"
            type="string"
            placeholder="Movie imageURL"
            name="imageURL"
            required
            />


            <button className="p-2 bg-blue-600 text-white rounded" >
                Add Movie
                </button>
            
        </form>
        </div>
    );
};