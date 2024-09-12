import { addMovie } from "@/app/actions/movies";

export default function AddMovieForm() {
    return (
        <form className="flex flex-col gap-4 w-96" action={addMovie}>
            <h2 className="text-2xl font-bold text-center mb-4">Add Movie</h2>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="title">
                    Title
                </label>
                <input
                    className="p-2 rounded-md border border-gray-300"
                    type="text"
                    id="title"
                    placeholder="Movie Title"
                    required
                    name="title"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="p-2 rounded-md border border-gray-300 resize-none"
                    id="description"
                    placeholder="Movie Description"
                    required
                    name="description"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="price">
                    Price
                </label>
                <input
                    className="p-2 rounded-md border border-gray-300"
                    type="number"
                    id="price"
                    placeholder="Movie Price"
                    required
                    name="price"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="releaseDate">
                    Release Date
                </label>
                <input
                    className="p-2 rounded-md border border-gray-300"
                    type="date"
                    id="releaseDate"
                    placeholder="Movie releaseDate"
                    required
                    name="releaseDate"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="stock">
                    Stock
                </label>
                <input
                    className="p-2 rounded-md border border-gray-300"
                    type="number"
                    id="stock"
                    placeholder="Movie Stock"
                    required
                    name="stock"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold" htmlFor="imageURL">
                    Image URL
                </label>
                <input
                    className="p-2 rounded-md border border-gray-300"
                    type="string"
                    id="imageURL"
                    placeholder="Movie imageURL"
                    required
                    name="imageURL"
                />
            </div>
            <button className="p-2 bg-blue-600 text-white rounded-md mt-4">
                Add Movie
            </button>
        </form>
    );
}
