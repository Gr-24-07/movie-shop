import AddMovieForm from "./add-movie-form";
import MovieTable from "./movie-table";

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
