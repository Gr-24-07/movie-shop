"use client";
import {useState} from 'react';



export default function AddMovie() {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    
    return (
        <div className="flex justify-center">
        <form className='flex flex-col w-1/2 gap-4'>
            
            <input className="text-left font-bold bg-slate-100"
            type="text"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            placeholder="Movie Title"
            required
            />
            <input className="text-left font-bold bg-slate-100"
            type="text"
            value={director}
            onChange={(e)=> setDirector(e.target.value)}
            placeholder="Director"
            required
            />
            <input className="text-left font-bold bg-slate-100"
            type="number"
            value={year}
            onChange={(e)=> setYear(e.target.value)}
            placeholder="Year"
            required
            />
            <button className="p-2 bg-blue-600 text-white rounded" >
                Add Movie
                </button>
            
        </form>
        </div>
    );
};