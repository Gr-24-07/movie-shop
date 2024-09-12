import { addMovie } from "@/app/actions/movies";
import MovieTable from "./movie-table";
import AddMovieForm from "./add-movie-form";

export default async function AddMovie() {
    return (
        <>
            <div className="container space-y-6 max-w-screen-lg">
                <AddMovieForm></AddMovieForm>
                <MovieTable></MovieTable>
            </div>
        </>
    );
}
