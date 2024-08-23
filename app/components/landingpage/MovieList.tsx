import { getMovies } from '@/app/actions/movies';
import PeopleComponent from '@/app/components/admin/people/PeopleComponent';

export default async function MovieList() {
  const result = await getMovies();
  
  if (!result.success) {
    console.error("Failed to fetch movies:", result.error);
    return <div>Failed to load movies. Please try again later.</div>;
  }

  return <PeopleComponent movies={result.movies} />;
} 