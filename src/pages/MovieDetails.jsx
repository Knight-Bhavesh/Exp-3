import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Clock, Star, Users } from 'lucide-react';
import { setShowTime } from '../store/slices/bookingSlice';

const showTimings = ['10:00 AM', '01:15 PM', '04:30 PM', '08:00 PM', '10:30 PM'];

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movies.find(m => m.id === parseInt(id)));

  if (!movie) {
    return <div className="p-20 text-center text-2xl dark:text-white">Movie not found!</div>;
  }

  const handleBookTicket = (time) => {
    dispatch(setShowTime({ time, movieId: movie.id }));
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Poster & Info */}
        <div className="lg:col-span-1 space-y-6">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full rounded-2xl shadow-xl object-cover aspect-[2/3]"
          />
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4 text-gray-600 dark:text-gray-300">
              <span className="flex items-center"><Star className="w-5 h-5 text-yellow-400 fill-current mr-1" /> {movie.rating}/10</span>
              <span className="flex items-center"><Clock className="w-5 h-5 mr-1" /> {movie.duration}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((g) => (
                <span key={g} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 rounded-lg">
                  {g}
                </span>
              ))}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Users className="w-5 h-5 mr-2" /> Cast
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {movie.cast.join(', ')}
            </p>
          </div>
        </div>

        {/* Right Column - Trailer & Booking */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About the Movie</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {movie.description}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trailer</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
               <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/8Qn_spdM5Zg?si=0P8vjD6J3J1J0I8p" 
                title="Movie Trailer" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Book Tickets</h2>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Select Showtime for Today</h3>
            <div className="flex flex-wrap gap-3">
              {showTimings.map((time) => (
                <button
                  key={time}
                  onClick={() => handleBookTicket(time)}
                  className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
