import Image from 'next/image'
import prisma from "@/lib/db";
import Link from 'next/link';

 
export default async function Page() {
    const movies= await prisma.movie.findMany() 

  return (
    <div>

       <div>
    
       <ul className="grid grid-cols-4 gap-4">
       {
         movies.map(movie => (
            <li className="flex flex-col place items-center gap-1 " key={movie.id}>
            <h2 >{`${movie.title}`}</h2>
            <p >ReleaseDate: {`${movie.releaseDate.toLocaleDateString()}`} </p>
            <p >Price: {`${movie.price}`} </p>
            <Image  
            src={movie.imageURL || "http://localhost:3000/_next/image?url=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Fw600_and_h900_bestv2%2Fb33nnKl1GSFbao4l3fZDDqsMx0F.jpg&w=640&q=75"}
            alt="Picture of the movie"
            width={300}
            height={50}
            
           
            />
            <Link href={`/movies/${movie.id}`}>Link
            </Link>
             <button className="p-2 text-justify font-bold bg-green-500 px-2 py-3 rounded-lg">
                Buy Movie
             </button>
            
            </li>
         ))   
   
        }
            
        </ul>
        </div>
    </div>
    
    );
}
                
    
