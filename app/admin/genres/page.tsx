
import GenreList from "./genre-list";
import Input from "./input";

export default function GenrePage() {
    return (
        <main className= "container py-10 px-20 bg-gray-200 shadow-md rounded-lg ">
            <div className="bg-blue-900 p-4 rounded-lg font-bold text-white">
                <h1 className="text-center text-md">Movie Genre</h1>
            </div>

            <Input />
            <GenreList />
        </main>
    );
}
