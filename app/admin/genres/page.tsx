import GenreList from "./genre-list";
import GenreAssignment from "./GenreAssignment";
import Input from "./input";
import { getGenres } from "@/app/actions/genre";

export default async function GenrePage() {
    const genres = await getGenres();

    return (
        <main className="container mx-auto py-10 px-6 md:px-20 bg-gray-200 shadow-md rounded-lg">
            <div className="bg-blue-900 p-4 rounded-lg font-bold text-white mb-6">
                <h1 className="text-center text-xl md:text-2xl">Movie Genre</h1>
            </div>

            <section className="space-y-6">
                <Input />
                <GenreAssignment />
                <GenreList genres={genres} />
            </section>
        </main>
    );
}
