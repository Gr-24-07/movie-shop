"use client";

import { useState, useEffect } from "react";
import { getGenres, updateGenre } from "@/app/actions/genre";
import { Genre } from "@prisma/client";
import { getMovies } from "./movie";

export default function GenreAssignment() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
    const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const genresResponse = await getGenres();
            setGenres(genresResponse);

            const moviesResponse = await getMovies();
            setMovies(moviesResponse);
        }
        fetchData();
    }, []);

    async function handleSave() {
        if (selectedGenreId) {
            try {
                await updateGenre({
                    id: selectedGenreId,
                    movies: selectedMovies,
                });
                setSuccessMessage("Movies assigned successfully!");
                setSelectedMovies([]); 
            } catch (error) {
                console.error("Failed to save changes", error);
            }
        }
    }

    
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <div className="p-6 mt-6 space-y-6 bg-gray-50 rounded-lg shadow-inner flex flex-col">
            <div>
                <label htmlFor="genre-select" className="block text-sm font-medium text-gray-700">Select Genre</label>
                <select
                    id="genre-select"
                    className="mt-1 block w-full"
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

            {selectedGenreId && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Movies</label>
                    <div className="mt-1">
                        {movies.map((movie) => (
                            <div key={movie.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={movie.id}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedMovies([...selectedMovies, movie.id]);
                                        } else {
                                            setSelectedMovies(selectedMovies.filter(id => id !== movie.id));
                                        }
                                    }}
                                    checked={selectedMovies.includes(movie.id)}
                                />
                                <label className="ml-2">{movie.title}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-black text-white rounded-lg px-4 py-3 mt-4 hover:bg-gray-700"
                >
                    Save Changes
                </button>
            </div>

            {successMessage && (
                <div className="text-green-600 text-sm mt-2">
                    {successMessage}
                </div>
            )}
        </div>
    );
}
