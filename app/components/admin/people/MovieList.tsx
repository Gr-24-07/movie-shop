import { getMovies } from '@/app/actions/movies';
import PeopleComponent from './PeopleComponent';

export default async function MovieList() {
  const movies = await getMovies();

  return <PeopleComponent movies={movies} />;
}