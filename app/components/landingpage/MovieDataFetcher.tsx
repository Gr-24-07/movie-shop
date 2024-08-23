import { getMostRecentMovies, getTopPurchasedMovies, getOldestMovies, getMoviesOnSale } from '@/app/actions/movies';
import Top5MoviesGridProps from './Top5MoviesGrid';

interface Movie {
  id: string;
  title: string;
  imageURL?: string;
  price: number;
}

export default async function MovieDataFetcher() {
  const newArrivals = await getMostRecentMovies(5);
  const bestsellers = await getTopPurchasedMovies(5);
  const classics = await getOldestMovies(5);
  const onSale = await getMoviesOnSale(5);

  const processMovies = (result: any): Movie[] => {
    if (result.success && Array.isArray(result.movies)) {
      return result.movies;
    }
    return [];
  };

  return (
    <Top5MoviesGridProps
      newArrivals={processMovies(newArrivals)}
      bestsellers={processMovies(bestsellers)}
      classics={processMovies(classics)}
      onSale={processMovies(onSale)}
    />
  );
}