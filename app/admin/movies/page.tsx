import { addMovie } from "@/app/actions/movies";
import MovieTable from "./movie-table";
import AddMovieForm from "./add-movie-form";

export default async function AddMovie() {
    return (
        <>
            <div className="flex flex-col items-center my-4 shadow-md rounded-lg">
                <AddMovieForm></AddMovieForm>
                <MovieTable></MovieTable>
            </div>
        </>
    );
}
