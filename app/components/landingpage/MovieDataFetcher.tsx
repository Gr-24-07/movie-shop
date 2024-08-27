import {
    getMostRecentMovies,
    getTopPurchasedMovies,
    getOldestMovies,
    getMoviesOnSale,
} from "@/app/actions/movies";
import Top5MoviesGridProps from "./Top5MoviesGrid";

export default async function MovieDataFetcher() {
    const newArrivals = await getMostRecentMovies(5);
    const bestsellers = await getTopPurchasedMovies(5);
    const classics = await getOldestMovies(5);
    const onSale = await getMoviesOnSale(5);

    return (
        <Top5MoviesGridProps
            newArrivals={newArrivals.success ? newArrivals.movies : []}
            bestsellers={bestsellers.success ? bestsellers.movies : []}
            classics={classics.success ? classics.movies : []}
            onSale={onSale.success ? onSale.movies : []}
        />
    );
}
