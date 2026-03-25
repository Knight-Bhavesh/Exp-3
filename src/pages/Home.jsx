import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store/slices/moviesSlice';
import MovieCard from '../components/movies/MovieCard';

const Home = () => {
  const dispatch = useDispatch();
  const { movies, searchTerm, filters } = useSelector((state) => state.movies);

  // Extract unique genres and languages for filter options
  const genres = useMemo(() => {
    const allGenres = new Set(['All']);
    movies.forEach(m => m.genre.forEach(g => allGenres.add(g)));
    return Array.from(allGenres);
  }, [movies]);

  const languages = useMemo(() => {
    const allLangs = new Set(['All']);
    movies.forEach(m => allLangs.add(m.language));
    return Array.from(allLangs);
  }, [movies]);

  // Optimized filtering using useMemo
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre = filters.genre === 'All' || movie.genre.includes(filters.genre);
      const matchLanguage = filters.language === 'All' || movie.language === filters.language;
      return matchSearch && matchGenre && matchLanguage;
    });
  }, [movies, searchTerm, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Now Showing</h1>
        
        <div className="flex space-x-4 w-full md:w-auto">
          <select 
            value={filters.genre}
            onChange={(e) => dispatch(setFilter({ type: 'genre', value: e.target.value }))}
            className="flex-1 md:flex-none p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer"
          >
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          
          <select 
            value={filters.language}
            onChange={(e) => dispatch(setFilter({ type: 'language', value: e.target.value }))}
            className="flex-1 md:flex-none p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer"
          >
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-xl">No movies found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
