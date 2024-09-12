"use client";

import { useEffect, useState } from "react";
import { getGenres, updateGenre, getGenreMovies } from "@/app/actions/genres";
import { Genre } from "@prisma/client";
import { getMovies } from "./movie";

export default function GenreAssignment() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [movies, setMovies] = useState<{ id: string; title: string }[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
    const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
    const [existingMovies, setExistingMovies] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Fetch genres and movies when the component is mounted
    useEffect(() => {
        async function fetchData() {
            try {
                const genresResponse = await getGenres();
                setGenres(genresResponse);

                const moviesResponse = await getMovies();
                setMovies(moviesResponse);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }
        fetchData();
    }, []);

    // Fetch the current movies assigned to the selected genre
    useEffect(() => {
        async function fetchExistingMovies() {
            if (selectedGenreId) {
                try {
                    const currentMovies = await getGenreMovies(selectedGenreId);
                    setExistingMovies(currentMovies.map((movie: any) => movie.id));
                    setSelectedMovies(currentMovies.map((movie: any) => movie.id)); 
                } catch (error) {
                    console.error("Failed to fetch existing movies", error);
                }
            }
        }
        fetchExistingMovies();
    }, [selectedGenreId]);

    // Handle saving assigned movies to the selected genre
    async function handleSave() {
        if (selectedGenreId) {
            try {
                const updatedMovies = Array.from(new Set(selectedMovies)); 

                await updateGenre({
                    id: selectedGenreId,
                    movies: updatedMovies,
                });
                setSuccessMessage("Movies updated successfully!");
                setSelectedMovies([]); 
            } catch (error) {
                console.error("Failed to save changes", error);
            }
        }
    }

    // Handle success message and clear after 2 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 2000);
            // Refresh the page after the delay
            window.location.reload();
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    // Optimized handleMovieSelection to manage movie checkboxes
    const handleMovieSelection = (movieId: string, isChecked: boolean) => {
        setSelectedMovies((prevSelectedMovies) => {
            if (isChecked) {
                return [...prevSelectedMovies, movieId];
            } else {
                return prevSelectedMovies.filter((id) => id !== movieId);
            }
        });
    };

    return (
        <div className="p-6 mt-6 space-y-6 bg-gray-50 rounded-lg shadow-inner flex flex-col">
            <div>
                {/* Dropdown to select a genre */}
                <label htmlFor="genre-select" className="block text-md text-black">
                    Select Genre
                </label>
                <select
                    id="genre-select"
                    className="mt-2 w-full text-gray-600 text-sm border border-gray-400 rounded-lg p-2"
                    onChange={(e) => setSelectedGenreId(e.target.value)}
                    value={selectedGenreId || ""}
                >
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Show movies checkboxes when a genre is selected */}
            {selectedGenreId && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Movies</label>
                    <div className="mt-1">
                        {movies.map((movie) => (
                            <div key={movie.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={movie.id}
                                    onChange={(e) =>
                                        handleMovieSelection(movie.id, e.target.checked)
                                    }
                                    checked={selectedMovies.includes(movie.id)}
                                />
                                <label className="ml-2">{movie.title}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Save button to assign selected movies to the selected genre */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={selectedGenreId === null || selectedMovies.length === 0}
                    className={`rounded-lg px-4 py-2 ${
                        selectedGenreId === null || selectedMovies.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-700"
                    }`}
                >
                    Assign Movies to Genre
                </button>
            </div>

            {/* Display success message when movies are updated */}
            {successMessage && (
                <div className="text-green-600 text-sm mt-2">{successMessage}</div>
            )}
        </div>
    );
}
